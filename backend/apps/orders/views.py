from django.conf import settings
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import OrderCreateSerializer, OrderSerializer, OrderTrackSerializer
from .models import Order
from apps.email_service import send_order_emails


class OrderCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        send_order_emails(order)
        return Response(
            {
                "order_number": order.order_number,
                "customer_email": order.customer_email,
                "total": str(order.total),
                "status": order.status,
            },
            status=status.HTTP_201_CREATED,
        )


class OrderTrackView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = OrderTrackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.validated_data["order"]
        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)
