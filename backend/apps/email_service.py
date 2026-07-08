from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def send_order_emails(order):
    subject = f"Order Confirmation - {order.order_number}"
    from_email = settings.DEFAULT_FROM_EMAIL or settings.EMAIL_HOST_USER
    recipient_list = [order.customer_email]

    html_content = render_to_string("emails/customer_confirmation.html", {"order": order})
    msg = EmailMultiAlternatives(subject, "Thank you for your order.", from_email, recipient_list)
    msg.attach_alternative(html_content, "text/html")
    msg.send(fail_silently=False)

    admin_subject = f"New Order Received - {order.order_number}"
    admin_html = render_to_string("emails/admin_notification.html", {"order": order})
    admin_msg = EmailMultiAlternatives(
        admin_subject,
        "A new order has been placed.",
        from_email,
        [settings.ADMIN_EMAIL or from_email],
    )
    admin_msg.attach_alternative(admin_html, "text/html")
    admin_msg.send(fail_silently=False)
