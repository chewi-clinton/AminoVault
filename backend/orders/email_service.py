from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

LOGO_URL = f'{settings.FRONTEND_URL}/email/logo.png'


def _send_html_email(subject, template_name, context, recipient_list):
    context = {**context, 'logo_url': LOGO_URL}
    html_body = render_to_string(template_name, context)
    text_body = strip_tags(html_body)

    email = EmailMultiAlternatives(
        subject=subject,
        body=text_body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=recipient_list,
    )
    email.attach_alternative(html_body, 'text/html')
    email.send(fail_silently=False)


def send_order_confirmation_to_customer(order):
    subject = f'Order Confirmation #{order.order_number} — {settings.STORE_NAME}'
    _send_html_email(
        subject=subject,
        template_name='orders/customer_confirmation.html',
        context={'order': order},
        recipient_list=[order.customer_email],
    )


def send_order_notification_to_owner(order):
    subject = f'New Order #{order.order_number} — ${order.total}'
    _send_html_email(
        subject=subject,
        template_name='orders/owner_notification.html',
        context={'order': order},
        recipient_list=[settings.STORE_OWNER_EMAIL],
    )
