from django.core.mail import send_mail
from django.conf import settings


def send_contact_notification(msg):
    sms_opt = 'Yes' if msg.sms_opt_in else 'No'

    # Notify store owner
    send_mail(
        subject=f'New Contact Message from {msg.first_name} {msg.last_name}',
        message=f"""
New contact form submission on {settings.STORE_NAME}

Name: {msg.first_name} {msg.last_name}
Email: {msg.email}
Phone: {msg.phone}
SMS Opt-in: {sms_opt}

Message:
{msg.message}
""".strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.STORE_OWNER_EMAIL],
        fail_silently=False,
    )

    # Auto-reply to customer
    send_mail(
        subject=f'We received your message — {settings.STORE_NAME}',
        message=f"""
Hi {msg.first_name},

Thank you for reaching out to {settings.STORE_NAME}! We've received your message and will get back to you as soon as possible.

YOUR MESSAGE:
─────────────────────────────
{msg.message}

If you have any urgent questions, please don't hesitate to reach out again.

Best regards,
The {settings.STORE_NAME} Team
""".strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[msg.email],
        fail_silently=False,
    )


def send_wholesale_notification(inq):
    # Notify store owner
    send_mail(
        subject=f'New Wholesale Inquiry — {inq.company_name}',
        message=f"""
New wholesale/bulk inquiry on {settings.STORE_NAME}

Company: {inq.company_name}
Website: {inq.website or 'N/A'}
Contact: {inq.first_name} {inq.last_name}
Email: {inq.email}
Phone: {inq.phone}

INQUIRY DETAILS:
{inq.inquiry_details}
""".strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.STORE_OWNER_EMAIL],
        fail_silently=False,
    )

    # Auto-reply to inquirer
    send_mail(
        subject=f'Wholesale Inquiry Received — {settings.STORE_NAME}',
        message=f"""
Hi {inq.first_name},

Thank you for your wholesale/bulk inquiry at {settings.STORE_NAME}! We've received your submission and our team will review it and get back to you shortly.

YOUR INQUIRY:
─────────────────────────────
Company: {inq.company_name}
{inq.inquiry_details}

We appreciate your interest in partnering with us.

Best regards,
The {settings.STORE_NAME} Wholesale Team
""".strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[inq.email],
        fail_silently=False,
    )
