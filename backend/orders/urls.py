from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import create_order, track_order, admin_stats, AdminOrderViewSet

admin_router = DefaultRouter()
admin_router.register(r'', AdminOrderViewSet, basename='admin-order')

urlpatterns = [
    path('', create_order, name='order-create'),
    path('track/', track_order, name='order-track'),
    path('admin/stats/', admin_stats, name='order-admin-stats'),
    path('admin/', include(admin_router.urls)),
]
