from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

    def validate_product_id(self, value):
        try:
            Product.objects.get(id=value, in_stock=True)
        except Product.DoesNotExist:
            raise serializers.ValidationError(f'Product with id {value} not found or out of stock.')
        return value


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_id', 'product_name', 'product_sku', 'variant', 'quantity', 'unit_price', 'line_total']


class OrderCreateSerializer(serializers.Serializer):
    customer_email = serializers.EmailField()
    customer_first_name = serializers.CharField(max_length=100)
    customer_last_name = serializers.CharField(max_length=100)
    customer_phone = serializers.CharField(max_length=30, required=False, allow_blank=True, default='')

    shipping_address_line1 = serializers.CharField(max_length=255)
    shipping_address_line2 = serializers.CharField(max_length=255, required=False, allow_blank=True, default='')
    shipping_city = serializers.CharField(max_length=100)
    shipping_state = serializers.CharField(max_length=100)
    shipping_zip = serializers.CharField(max_length=20)
    shipping_country = serializers.CharField(max_length=100, default='US')

    items = OrderItemInputSerializer(many=True, min_length=1)
    shipping_protection = serializers.BooleanField(default=False)
    coupon_code = serializers.CharField(max_length=50, required=False, allow_blank=True, default='')
    notes = serializers.CharField(required=False, allow_blank=True, default='')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer_email', 'customer_first_name', 'customer_last_name',
            'customer_phone', 'shipping_address_line1', 'shipping_address_line2',
            'shipping_city', 'shipping_state', 'shipping_zip', 'shipping_country',
            'items', 'subtotal', 'shipping_cost', 'shipping_protection',
            'shipping_protection_cost', 'discount_amount', 'total',
            'coupon_code_used', 'status', 'tracking_number', 'notes', 'created_at',
        ]


class OrderTrackSerializer(serializers.Serializer):
    order_number = serializers.CharField(max_length=20)
    billing_email = serializers.EmailField()
