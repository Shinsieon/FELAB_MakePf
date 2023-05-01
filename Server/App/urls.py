from django.urls import path
from . import views

urlpatterns = [
    path('registerUser', views.registerUser, name='registerUser'),
    path('loginWithEmail', views.loginWithEmail, name='loginWithEmail'),
    path('loginWithKakao', views.loginWithKakao, name='loginWithKakao'),
    path('getMyStocks',views.getMyStocks, name='getMyStocks'),
    path('getAllStocks',views.getAllStocks, name='getAllStocks'),
    path('saveUserAsset',views.saveUserAsset, name='saveUserAsset'),
    path('getUserAssetRetArray',views.getUserAssetRetArray, name='getUserAssetRetArray'),
    path('getUserAssetPerformance',views.getUserAssetPerformance, name='getUserAssetPerformance'),
    path('getIndivisualPerformance',views.getIndivisualPerformance, name='getIndivisualPerformance'),
    
]