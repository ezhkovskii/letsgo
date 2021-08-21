from django.urls import path, include
from letsgoapi import views

urlpatterns = [
    path('auth-inst/', views.AuthInst.as_view()),
    path('press-tours/', views.PressTourList.as_view()),
    path('press-tours/<int:pk>/', views.PressTourDetail.as_view()),
    path('get-bloggers-from-instagram-by-params/', views.get_list_bloggers_from_instagram),
    path('get_blogger_info/', views.get_blogger_info),
]
