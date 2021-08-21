from django.urls import path, include
from letsgoapi import views

urlpatterns = [
    path('auth-inst/', views.auth_inst),
]
