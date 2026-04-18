from decimal import Decimal
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from products.models import Product, Coupon
from .models import Order, OrderItem
from .serializers import OrderCreateSerializer, OrderSerializer, OrderTrackSerializer
from .email_service import send_order_confirmation_to_customer, send_order_notification_to_owner


SHIPPING_PROTECTION_COST = Decimal('4.50')


@api_view(['POST'])
@permission_classes([AllowAny])
def create_order(request):
    serializer = OrderCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    items_data = data['items']

    # Build order items and calculate subtotal
    subtotal = Decimal('0')
    order_items_to_create = []
    for item_data in items_data:
        product = Product.objects.get(id=item_data['product_id'])
        quantity = item_data['quantity']
        unit_price = product.price
        order_items_to_create.append({
            'product': product,
            'product_name': product.name,
            'product_sku': product.sku,
            'variant': product.variant,
            'quantity': quantity,
            'unit_price': unit_price,
        })
        subtotal += unit_price * quantity

    # Apply bulk discounts (18% for 6+, 20% for 8+ vials)
    total_vials = sum(i['quantity'] for i in items_data)
    auto_discount = Decimal('0')
    if total_vials >= 8:
        auto_discount = subtotal * Decimal('0.20')
    elif total_vials >= 6:
        auto_discount = subtotal * Decimal('0.18')

    # Apply coupon on top of subtotal (before auto discount, or pick the better one)
    coupon_obj = None
    coupon_discount = Decimal('0')
    coupon_code = data.get('coupon_code', '').strip().upper()
    if coupon_code:
        try:
            coupon_obj = Coupon.objects.get(code=coupon_code)
            if coupon_obj.is_valid():
                if coupon_obj.is_percentage:
                    coupon_discount = subtotal * (Decimal(coupon_obj.discount_percentage) / 100)
                else:
                    coupon_discount = coupon_obj.discount_amount
            else:
                coupon_obj = None
        except Coupon.DoesNotExist:
            pass

    # Use whichever discount is better
    discount_amount = max(auto_discount, coupon_discount)
    if discount_amount == coupon_discount and coupon_obj:
        coupon_code_used = coupon_code
    else:
        coupon_code_used = ''
        coupon_obj = None

    shipping_protection = data['shipping_protection']
    shipping_protection_amount = SHIPPING_PROTECTION_COST if shipping_protection else Decimal('0')
    shipping_cost = Decimal('0')  # Free shipping
    total = subtotal - discount_amount + shipping_cost + shipping_protection_amount

    order = Order.objects.create(
        customer_email=data['customer_email'],
        customer_first_name=data['customer_first_name'],
        customer_last_name=data['customer_last_name'],
        customer_phone=data.get('customer_phone', ''),
        shipping_address_line1=data['shipping_address_line1'],
        shipping_address_line2=data.get('shipping_address_line2', ''),
        shipping_city=data['shipping_city'],
        shipping_state=data['shipping_state'],
        shipping_zip=data['shipping_zip'],
        shipping_country=data.get('shipping_country', 'US'),
        subtotal=subtotal,
        shipping_cost=shipping_cost,
        shipping_protection=shipping_protection,
        shipping_protection_cost=shipping_protection_amount,
        discount_amount=discount_amount,
        total=total,
        coupon=coupon_obj,
        coupon_code_used=coupon_code_used,
        notes=data.get('notes', ''),
    )

    # Create order items
    for item in order_items_to_create:
        OrderItem.objects.create(order=order, **item)

    # Increment coupon usage
    if coupon_obj:
        coupon_obj.times_used += 1
        coupon_obj.save(update_fields=['times_used'])

    # Send emails (non-blocking; if email fails order is still created)
    try:
        send_order_confirmation_to_customer(order)
        send_order_notification_to_owner(order)
    except Exception:
        pass

    return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def track_order(request):
    serializer = OrderTrackSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    order_number = serializer.validated_data['order_number'].upper()
    billing_email = serializer.validated_data['billing_email'].lower()

    try:
        order = Order.objects.prefetch_related('items').get(
            order_number=order_number,
            customer_email__iexact=billing_email,
        )
    except Order.DoesNotExist:
        return Response(
            {'detail': 'No order found with that order number and email.'},
            status=status.HTTP_404_NOT_FOUND,
        )

    return Response(OrderSerializer(order).data)
