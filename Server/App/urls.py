from django.urls import path
from . import views

urlpatterns = [
    path('apiHome',views.apiHome, name='apiHome'),
    path('kakaoLoginDone', views.kakaoLoginDone, name='kakaoLoginDone'),
    path('getStocks',views.getStocks, name='getStocks'),
]