from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from pykrx import stock 
import pandas as pd
import numpy as np
import math as math
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from .models import USERTBL
from .models import USERASSET
import datetime as dt
from dateutil.relativedelta import relativedelta
# Create your views here.
NO_USER_ERROR = 0
INSERT_ERROR = 1
UPDATE_ERROR = 2
USER_MISMATCH_ERROR = 3
USER_ALREADY_EXISTS = 4
NO_ASSET_ERROR=5
SUCCESS_CODE = 200

@method_decorator(csrf_exempt, name='dispatch')
def getUserAssetRetArray(req) :
    dataFromView = json.loads(req.body)
    
    if not USERASSET.objects.filter(email=dataFromView['email']).exists():
        return HttpResponse(NO_ASSET_ERROR)
    else:
        nowTime = dt.datetime.now()
        returnDF = pd.DataFrame({})
        
        for asset in USERASSET.objects.filter(email=dataFromView['email']):
            invStartDate = nowTime - relativedelta(months = asset.investmentperiod) #format = 20220101 
            stockDF =  stock.get_market_ohlcv(invStartDate, nowTime.strftime("%Y%m%d"), asset.code, freq="m")
            returnDF = pd.concat([returnDF, stockDF['종가'].pct_change().rename(asset.code)],axis=1).fillna(0)

        returnObj = {}
        returnObj['mean'] =  returnDF.mean(axis=1).tolist()

        newIndex = []
        for ts in returnDF.index.tolist(): #timestamp index 를 string으로 변환
            dt_ = datetime.strftime(ts, '%Y%m%d')  # convert string to datetime object
            newIndex.append(dt_)
        returnObj['date'] = newIndex
        print(returnObj)
    return HttpResponse(json.dumps(returnObj))

@method_decorator(csrf_exempt, name='dispatch')
def getUserAssetPerformance(req):
    dataFromView = json.loads(req.body)
    interest = 0.03 #기준금리(무위험 수익률)
    nowTime = dt.datetime.now()
    returnDF = pd.DataFrame({})
    assets = USERASSET.objects.filter(email=dataFromView['email'])
    for asset in assets:
        invStartDate = nowTime - relativedelta(months = asset.investmentperiod) #format = 20220101 
        stockDF =  stock.get_market_ohlcv(invStartDate, nowTime.strftime("%Y%m%d"), asset.code, freq="m")
        returnDF = pd.concat([returnDF, stockDF['종가'].pct_change().rename(asset.code)],axis=1).fillna(0)

    if len(assets)==0:
        return HttpResponse(NO_ASSET_ERROR)
    else:
        meanArr = returnDF.mean(axis=1)
        returnObj = {}
        returnObj['retMean'] =  meanArr.mean()
        returnObj['std'] = math.sqrt(np.var(meanArr.tolist()))
        returnObj['sharpe'] = (returnObj['retMean']- interest)/returnObj['std']
        returnObj['mdd'] = abs(min(meanArr.tolist())/max(meanArr.tolist())-1)*100
        return HttpResponse(json.dumps(returnObj))

@method_decorator(csrf_exempt, name='dispatch')
def getIndivisualPerformance(req):
    dataFromView = json.loads(req.body)
    nowTime = dt.datetime.now()
    returnObj = {}
    for asset in USERASSET.objects.filter(email=dataFromView['email']):
        invStartDate = nowTime - relativedelta(months = asset.investmentperiod) #format = 20220101 
        fundDF =  stock.get_market_fundamental(invStartDate, nowTime.strftime("%Y%m%d"), asset.code, freq="m")
        stockDF =  stock.get_market_ohlcv(invStartDate, nowTime.strftime("%Y%m%d"), asset.code, freq="m")
        mean = stockDF['종가'].pct_change().mean()
        returnObj[asset.name] = {'EPS' :  fundDF['EPS'].mean(), 'PER' : fundDF['PER'].mean(), 'RETURN' : mean}

    if returnObj is None:
        return HttpResponse(NO_ASSET_ERROR)
    else:
        return HttpResponse(json.dumps(returnObj))
    
