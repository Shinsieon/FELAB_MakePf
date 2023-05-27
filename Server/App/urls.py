from django.urls import path
from . import views

urlpatterns = [
    path('getUserAssetRetArray',views.getUserAssetRetArray, name='getUserAssetRetArray'),
    path('getUserAssetPerformance',views.getUserAssetPerformance, name='getUserAssetPerformance'),
    path('getIndivisualPerformance',views.getIndivisualPerformance, name='getIndivisualPerformance'),
]