from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Product, Category, Coupon
from .serializers import ProductSerializer, CategorySerializer, CouponSerializer, AdminProductSerializer

# Public Views
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(in_stock=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['is_featured', 'is_upsell', 'category']

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class ValidateCouponView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        code = request.data.get('code')
        if not code:
            return Response({"detail": "Coupon code is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            coupon = Coupon.objects.get(code__iexact=code, is_active=True)
            serializer = CouponSerializer(coupon)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Coupon.DoesNotExist:
            return Response({"detail": "Invalid or expired coupon code."}, status=status.HTTP_404_NOT_FOUND)

# Admin Views
class AdminProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = AdminProductSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'sku']
    ordering_fields = ['name', 'price', 'sort_order', 'created_at']