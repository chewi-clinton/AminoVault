from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Category, Product, Coupon
from .serializers import (
    CategorySerializer, ProductSerializer, AdminProductSerializer,
    CouponValidateSerializer, CouponResponseSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(in_stock=True).select_related('category')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category__slug', 'is_featured', 'is_upsell']
    search_fields = ['name', 'sku', 'description']
    ordering_fields = ['price', 'name', 'sort_order', 'created_at']
    ordering = ['sort_order']


class AdminProductViewSet(viewsets.ModelViewSet):
    """Full CRUD for admin users only."""
    queryset = Product.objects.all().select_related('category')
    serializer_class = AdminProductSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category__slug', 'in_stock', 'is_featured', 'is_upsell']
    search_fields = ['name', 'sku']
    ordering_fields = ['price', 'name', 'sort_order', 'created_at']
    ordering = ['sort_order']


@api_view(['POST'])
@permission_classes([AllowAny])
def validate_coupon(request):
    serializer = CouponValidateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    code = serializer.validated_data['code'].upper()
    try:
        coupon = Coupon.objects.get(code=code)
    except Coupon.DoesNotExist:
        return Response({'detail': 'Invalid coupon code.'}, status=status.HTTP_404_NOT_FOUND)

    if not coupon.is_valid():
        return Response({'detail': 'This coupon is expired or no longer valid.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(CouponResponseSerializer(coupon).data)
