from decimal import Decimal

from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from apps.products.models import Product, Coupon
from .models import Order, OrderItem


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class OrderCreateSerializer(serializers.Serializer):
    customer_first_name = serializers.CharField(max_length=100)
    customer_last_name = serializers.CharField(max_length=100)
    customer_email = serializers.EmailField()
    customer_phone = serializers.CharField(max_length=30, required=False, allow_blank=True)

    shipping_address_line1 = serializers.CharField(max_length=255)
    shipping_address_line2 = serializers.CharField(max_length=255, required=False, allow_blank=True)
    shipping_city = serializers.CharField(max_length=100)
    shipping_state = serializers.CharField(max_length=100)
    shipping_zip = serializers.CharField(max_length=20)
    shipping_country = serializers.CharField(max_length=100, required=False, allow_blank=True)

    notes = serializers.CharField(required=False, allow_blank=True)
    items = serializers.ListField(child=OrderItemInputSerializer(), allow_empty=False)
    shipping_protection = serializers.BooleanField(default=False)
    coupon_code = serializers.CharField(required=False, allow_blank=True)

    def validate_items(self, value):
        product_ids = [item["product_id"] for item in value]
        products = Product.objects.filter(id__in=product_ids)

        if len(products) != len(product_ids):
            raise serializers.ValidationError("One or more products are invalid.")

        for item in value:
            product = products.get(id=item["product_id"])
            if not product.in_stock:
                raise serializers.ValidationError(f"{product.name} is currently out of stock.")

        return value

    def validate_coupon_code(self, value):
        if not value:
            return ""

        coupon = Coupon.objects.filter(code__iexact=value, is_active=True).first()
        if not coupon:
            raise serializers.ValidationError("Invalid or expired coupon code.")
        return value

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        coupon_code = validated_data.pop("coupon_code", "")
        shipping_protection = validated_data.pop("shipping_protection", False)

        subtotal = Decimal("0.00")
        product_map = {}
        for item_data in items_data:
            product = Product.objects.get(id=item_data["product_id"])
            product_map[product.id] = product
            line_total = product.price * item_data["quantity"]
            subtotal += line_total

        discount_amount = Decimal("0.00")
        if coupon_code:
            coupon = Coupon.objects.get(code__iexact=coupon_code, is_active=True)
            discount_amount = (subtotal * coupon.discount_percent / Decimal("100")).quantize(Decimal("0.01"))

        protection_cost = Decimal("4.50") if shipping_protection else Decimal("0.00")
        total = (subtotal - discount_amount + protection_cost).quantize(Decimal("0.01"))

        order = Order.objects.create(
            **validated_data,
            coupon_code=coupon_code,
            shipping_protection=shipping_protection,
            subtotal=subtotal.quantize(Decimal("0.01")),
            discount_amount=discount_amount.quantize(Decimal("0.01")),
            total=total,
        )

        for item_data in items_data:
            product = product_map[item_data["product_id"]]
            line_total = product.price * item_data["quantity"]
            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.name,
                product_sku=product.sku,
                quantity=item_data["quantity"],
                unit_price=product.price,
                line_total=line_total.quantize(Decimal("0.01")),
            )

        return order


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product_name", "quantity", "unit_price", "line_total"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "order_number",
            "customer_first_name",
            "customer_last_name",
            "customer_email",
            "customer_phone",
            "shipping_address_line1",
            "shipping_address_line2",
            "shipping_city",
            "shipping_state",
            "shipping_zip",
            "shipping_country",
            "notes",
            "shipping_protection",
            "coupon_code",
            "subtotal",
            "discount_amount",
            "total",
            "status",
            "tracking_number",
            "created_at",
            "items",
        ]


class OrderTrackSerializer(serializers.Serializer):
    order_number = serializers.CharField()
    billing_email = serializers.EmailField()

    def validate(self, attrs):
        order = Order.objects.filter(order_number=attrs["order_number"], customer_email__iexact=attrs["billing_email"]).first()
        if not order:
            raise serializers.ValidationError({"detail": "Order not found. Please check your details."})
        attrs["order"] = order
        return attrs
