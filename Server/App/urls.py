from django.urls import path
from . import views

urlpatterns = [
    path('registerWithEmail', views.registerWithEmail, name='registerWithEmail'),
    path('loginWithEmail', views.loginWithEmail, name='loginWithEmail'),
    path('getRefreshToken', views.getRefreshToken, name='getRefreshToken'),
    path('loginWithKakao', views.loginWithKakao, name='loginWithKakao'),
    path('getMyStocks',views.getMyStocks, name='getMyStocks'),
    path('getAllStocks',views.getAllStocks, name='getAllStocks'),
    path('saveUserAsset',views.saveUserAsset, name='saveUserAsset'),
    path('getUserAssetRetArray',views.getUserAssetRetArray, name='getUserAssetRetArray'),
    path('getUserAssetPerformance',views.getUserAssetPerformance, name='getUserAssetPerformance'),
    path('getIndivisualPerformance',views.getIndivisualPerformance, name='getIndivisualPerformance'),
    
]