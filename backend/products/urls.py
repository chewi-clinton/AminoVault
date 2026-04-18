from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, AdminProductViewSet, validate_coupon

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'', ProductViewSet, basename='product')

admin_router = DefaultRouter()
admin_router.register(r'', AdminProductViewSet, basename='admin-product')

urlpatterns = [
    path('coupons/validate/', validate_coupon, name='coupon-validate'),
    path('admin/', include(admin_router.urls)),
    path('', include(router.urls)),
]
