from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ProductListView, CategoryListView, ValidateCouponView, AdminProductViewSet

router = DefaultRouter()
router.register(r'admin', AdminProductViewSet, basename='admin-product')

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('validate-coupon/', ValidateCouponView.as_view(), name='validate-coupon'),
]

urlpatterns += router.urls
