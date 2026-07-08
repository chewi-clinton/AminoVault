from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactFormSerializer, WholesaleFormSerializer

class ContactFormView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ContactFormSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            subject = "New Contact Form Submission"
            message = f"""
            New message from {data['first_name']} {data['last_name']}:
            Email: {data['email']}
            Phone: {data['phone']}
            SMS Opt-in: {'Yes' if data['sms_opt_in'] else 'No'}
            Message: {data['message']}
            """
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL])
            return Response({"message": "Thank you for your message."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WholesaleFormView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = WholesaleFormSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            subject = "New Wholesale Inquiry"
            message = f"""
            New wholesale inquiry from {data['first_name']} {data['last_name']}:

            Company: {data['company_name']}
            Website: {data.get('website', 'N/A')}
            Email: {data['email']}
            Phone: {data['phone']}

            Inquiry Details:
            {data['inquiry_details']}
            """
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=False,
            )
            return Response({"message": "Thank you for your inquiry."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)