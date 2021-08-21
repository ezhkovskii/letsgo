from django.urls import path, include
from letsgoapi import views

urlpatterns = [
    path('auth-inst/', views.auth_inst),
    path('press-tours/', views.PressTourList.as_view()),
    path('press-tours/<int:pk>/', views.PressTourDetail.as_view()),
]
