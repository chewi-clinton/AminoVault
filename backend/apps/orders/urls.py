from django.urls import path

from .views import OrderCreateView, OrderTrackView

urlpatterns = [
    path('', OrderCreateView.as_view(), name='order-create'),
    path('track/', OrderTrackView.as_view(), name='order-track'),
]
