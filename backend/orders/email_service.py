from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_order_confirmation_to_customer(order):
    subject = f'Order Confirmation #{order.order_number} — {settings.STORE_NAME}'
    items_text = '\n'.join([
        f'  • {item.quantity}x {item.product_name} ({item.variant}) — ${item.line_total}'
        for item in order.items.all()
    ])
    shipping_prot = f'\n  • Shipping Protection — $4.50' if order.shipping_protection else ''
    discount_text = f'\n  Discount: -${order.discount_amount}' if order.discount_amount else ''

    message = f"""
Hi {order.customer_first_name},

Thank you for your order! We've received your order and it's being processed.

ORDER DETAILS
─────────────────────────────
Order Number: #{order.order_number}
Status: {order.get_status_display()}

ITEMS ORDERED
─────────────────────────────
{items_text}{shipping_prot}

PRICING
─────────────────────────────
Subtotal: ${order.subtotal}{discount_text}
Shipping: {'FREE' if order.shipping_cost == 0 else f'${order.shipping_cost}'}
Total: ${order.total}

SHIPPING TO
─────────────────────────────
{order.customer_full_name}
{order.shipping_address_line1}
{order.shipping_address_line2 + chr(10) if order.shipping_address_line2 else ''}{order.shipping_city}, {order.shipping_state} {order.shipping_zip}
{order.shipping_country}

You will receive a shipping confirmation email with your tracking number once your order has shipped.

If you have any questions, reply to this email or visit our website.

Thank you for choosing {settings.STORE_NAME}!
"""

    send_mail(
        subject=subject,
        message=message.strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[order.customer_email],
        fail_silently=False,
    )


def send_order_notification_to_owner(order):
    subject = f'New Order #{order.order_number} — ${order.total}'
    items_text = '\n'.join([
        f'  • {item.quantity}x {item.product_name} ({item.variant}) — SKU: {item.product_sku} — ${item.line_total}'
        for item in order.items.all()
    ])
    discount_text = f'\n  Discount ({order.coupon_code_used}): -${order.discount_amount}' if order.discount_amount else ''

    message = f"""
NEW ORDER RECEIVED — {settings.STORE_NAME}
═══════════════════════════════════════

ORDER #{order.order_number}
Date: {order.created_at.strftime('%Y-%m-%d %H:%M UTC')}

CUSTOMER
─────────────────────────────
Name: {order.customer_full_name}
Email: {order.customer_email}
Phone: {order.customer_phone or 'N/A'}

SHIPPING ADDRESS
─────────────────────────────
{order.shipping_address_line1}
{order.shipping_address_line2 + chr(10) if order.shipping_address_line2 else ''}{order.shipping_city}, {order.shipping_state} {order.shipping_zip}
{order.shipping_country}

ITEMS ORDERED
─────────────────────────────
{items_text}

PRICING
─────────────────────────────
Subtotal: ${order.subtotal}
Shipping Protection: {'$4.50' if order.shipping_protection else 'No'}{discount_text}
Shipping: {'FREE' if order.shipping_cost == 0 else f'${order.shipping_cost}'}
TOTAL: ${order.total}

Notes: {order.notes or 'None'}
"""

    send_mail(
        subject=subject,
        message=message.strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.STORE_OWNER_EMAIL],
        fail_silently=False,
    )
