from django.urls import path
from .views import create_order, track_order

urlpatterns = [
    path('', create_order, name='order-create'),
    path('track/', track_order, name='order-track'),
]
