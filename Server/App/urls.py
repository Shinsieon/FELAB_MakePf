from django.urls import path
from . import views

urlpatterns = [
    path('',views.apiHome, name='apiHome'),
    path('getStocks',views.getStocks, name='getStocks'),
]