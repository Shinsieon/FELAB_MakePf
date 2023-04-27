from django.urls import path
from . import views

urlpatterns = [
    path('apiHome',views.apiHome, name='apiHome'),
    path('kakaoLoginDone', views.kakaoLoginDone, name='kakaoLoginDone'),
    path('getMyStocks',views.getMyStocks, name='getMyStocks'),
    path('getAllStocks',views.getAllStocks, name='getAllStocks'),
    path('saveUserAsset',views.saveUserAsset, name='saveUserAsset'),
    path('getUserAssetRetArray',views.getUserAssetRetArray, name='getUserAssetRetArray'),
    path('getUserAssetPerformance',views.getUserAssetPerformance, name='getUserAssetPerformance'),
    path('getIndivisualPerformance',views.getIndivisualPerformance, name='getIndivisualPerformance'),
    
]