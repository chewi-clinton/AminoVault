from django.urls import path
from .views import create_order, track_order, admin_stats

urlpatterns = [
    path('', create_order, name='order-create'),
    path('track/', track_order, name='order-track'),
    path('admin/stats/', admin_stats, name='order-admin-stats'),
]
