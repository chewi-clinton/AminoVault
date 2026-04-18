from django.urls import path
from .views import submit_contact, submit_wholesale

urlpatterns = [
    path('', submit_contact, name='contact-submit'),
    path('wholesale/', submit_wholesale, name='wholesale-submit'),
]
