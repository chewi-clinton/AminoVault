from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import register, login, logout, me, change_password

urlpatterns = [
    path('register/', register, name='auth-register'),
    path('login/', login, name='auth-login'),
    path('logout/', logout, name='auth-logout'),
    path('me/', me, name='auth-me'),
    path('change-password/', change_password, name='auth-change-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
