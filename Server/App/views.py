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
from .models import Usertbl
from .models import UserStocks
import datetime as dt
from dateutil.relativedelta import relativedelta
# Create your views here.
NO_USER_ERROR = 0
INSERT_ERROR = 1
UPDATE_ERROR = 2
def apiHome(request):
    print("hello apiHome is called")
    return HttpResponse("DJANGO API")

@method_decorator(csrf_exempt, name='dispatch')
def kakaoLoginDone(request):
    data = json.loads(request.body)
    usertbl = Usertbl()
    usertbl.k_name = data['userInfo']['properties']['nickname']
    usertbl.k_email = data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else ""
    usertbl.k_image = data['userInfo']['properties']['profile_image']
    usertbl.k_gender = data['userInfo']['kakao_account']['gender']
    usertbl.k_age_range = data['userInfo']['kakao_account']['age_range']
    print(data)
    if(len(Usertbl.objects.filter(k_email = (data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else "")))==0):
        usertbl.save()

    # if(len(UserStocks.objects.filter(email = (data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else "")))==0):
    #     userStocks.save()
    return HttpResponse("Login Done!")

@method_decorator(csrf_exempt, name='dispatch')
def getMyStocks(req): 
    response = {}
    dataFromView = json.loads(req.body)
    myStocks = UserStocks.objects.filter(email=dataFromView['email'])
    response['result'] = serializers.serialize("json", myStocks)

    return HttpResponse(response['result'], content_type="application/json")

def getAllStocks(req):
    today = datetime.today().strftime("%Y%m%d")    # YYYYmmddHHMMSS 형태의 시간 출력
    stocks = {}
    tickers = stock.get_market_ticker_list(today)
    for ticker in tickers:
        name = stock.get_market_ticker_name(ticker)
        stocks[ticker] = name
    return HttpResponse(json.dumps(stocks))
    
@method_decorator(csrf_exempt, name='dispatch')
def saveUserAsset(req) :
    dataFromView = json.loads(req.body)
    assets = dataFromView['assets']
    #email 값이 있는지부터 체크 없으면 fail
    if dataFromView['email'] == "": 
        return HttpResponse(NO_USER_ERROR)
    else:
        for asset in assets:
            userStocks = UserStocks()
            if len(UserStocks.objects.filter(email = dataFromView['email'], code = asset['code']))>0 : 
                item = UserStocks.objects.get(email = dataFromView['email'],code = asset['code'])
                item.weight = asset['weight']
                item.amount = asset['amount']
                item.investmentperiod = asset['investmentPeriod']
                item.save()
            else :
                userStocks.email = dataFromView['email']
                userStocks.code = asset['code']
                userStocks.name = asset['name']
                userStocks.weight = asset['weight']
                userStocks.amount = asset['amount']
                userStocks.investmentperiod = asset['investmentPeriod']
                userStocks.save()
    
    return HttpResponse("saved successfully")

@method_decorator(csrf_exempt, name='dispatch')
def getUserAssetRetArray(req) :
    dataFromView = json.loads(req.body)
    if dataFromView['email'] == "": 
        return HttpResponse(NO_USER_ERROR)
    
    nowTime = dt.datetime.now()
    returnDF = pd.DataFrame({})
    for asset in UserStocks.objects.filter(email=dataFromView['email']):
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
    if dataFromView['email'] == "": 
        return HttpResponse(NO_USER_ERROR)
    
    interest = 0.03 #기준금리(무위험 수익률)
    nowTime = dt.datetime.now()
    returnDF = pd.DataFrame({})
    for asset in UserStocks.objects.filter(email=dataFromView['email']):
        invStartDate = nowTime - relativedelta(months = asset.investmentperiod) #format = 20220101 
        stockDF =  stock.get_market_ohlcv(invStartDate, nowTime.strftime("%Y%m%d"), asset.code, freq="m")
        returnDF = pd.concat([returnDF, stockDF['종가'].pct_change().rename(asset.code)],axis=1).fillna(0)

    meanArr = returnDF.mean(axis=1)
    returnObj = {}
    returnObj['retMean'] =  meanArr.mean()
    returnObj['std'] = math.sqrt(np.var(meanArr.tolist()))
    returnObj['sharpe'] = (returnObj['retMean']- interest)/returnObj['std']
    returnObj['mdd'] = abs(min(meanArr.tolist())/max(meanArr.tolist())-1)*100
    return HttpResponse(json.dumps(returnObj))