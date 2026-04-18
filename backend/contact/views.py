from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import ContactMessageSerializer, WholesaleInquirySerializer
from .email_service import send_contact_notification, send_wholesale_notification


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    msg = serializer.save()
    try:
        send_contact_notification(msg)
    except Exception:
        pass
    return Response({'detail': 'Your message has been sent. We will get back to you shortly.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_wholesale(request):
    serializer = WholesaleInquirySerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    inq = serializer.save()
    try:
        send_wholesale_notification(inq)
    except Exception:
        pass
    return Response({'detail': 'Your wholesale inquiry has been received. Our team will contact you soon.'}, status=status.HTTP_201_CREATED)
