from django.urls import path

from .views import ContactFormView, WholesaleFormView

urlpatterns = [
    path('', ContactFormView.as_view(), name='contact-form'),
    path('wholesale/', WholesaleFormView.as_view(), name='wholesale-form'),
]
