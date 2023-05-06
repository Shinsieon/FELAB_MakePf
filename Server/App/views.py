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
def registerWithEmail(request):
    data = json.loads(request.body)
    print(data)
    #이미 가입된 내역이 있는지 이메일로 비교
    user = USERTBL()
    print(len(USERTBL.objects.filter(email = (data['email']))))
    if(len(USERTBL.objects.filter(email = (data['email'])))==0):
        user.name = data['name']
        user.email = data['email']
        user.password = make_password(data['password'])
        user.image = ""
        user.gender = data['gender']
        user.age_range = data['age']
        user.is_super = "false"
        user.save()
        token = TokenObtainPairSerializer.get_token(user)
        refresh_token = str(token)
        access_token = str(token.access_token)
        res = {}
        res['userName'] = user.name
        res['accessToken'] = access_token
        res['refreshToken']= refresh_token
        return HttpResponse(json.dumps(res))
        
    else:
        return HttpResponse(USER_ALREADY_EXISTS)
    
@method_decorator(csrf_exempt, name='dispatch')
def getRefreshToken(request):
    data = json.loads(request.body)
    user = USERTBL.objects.filter(email = data['email']).first()
    if user is None:
        return HttpResponse(NO_USER_ERROR)
    else :
        token = TokenObtainPairSerializer.get_token(user)
        access_token = str(token.access_token)
        refresh_token = str(token)
        res = {}
        res['accessToken'] = access_token
        res['refreshToken']= refresh_token
        return HttpResponse(json.dumps(res))

@method_decorator(csrf_exempt, name='dispatch')
def loginWithKakao(request):
    data = json.loads(request.body)
    print(data)
    if(len(USERTBL.objects.filter(email = (data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else "")))==0):
        user = USERTBL()
        user.name = data['userInfo']['properties']['nickname']
        user.email = data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else ""
        user.image = data['userInfo']['properties']['profile_image']
        user.gender = data['userInfo']['kakao_account']['gender']
        user.age_range = data['userInfo']['kakao_account']['age_range']
        
        user.save()
    else:
        user = USERTBL.objects.get(email = (data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else ""))
        user.image = data['userInfo']['properties']['profile_image']
        user.token = data['userToken']
        user.save()

    token = TokenObtainPairSerializer.get_token(user)
    access_token = str(token.access_token)
    refresh_token = str(token)
    res = {}
    res['userName'] = user.name
    res['userEmail'] = user.email
    res['userGender'] = user.gender
    res['userAge'] = user.age_range
    res['accessToken'] = access_token
    res['refreshToken']= refresh_token
    return HttpResponse(json.dumps(res))

@method_decorator(csrf_exempt, name='dispatch')
def loginWithEmail(req):
    dataFromView = json.loads(req.body)
    email = dataFromView['email']
    user = USERTBL.objects.filter(email=email).first()
    if user is None: # 해당 email의 user가 존재하지 않는 경우
        return HttpResponse(NO_USER_ERROR)

    if not check_password(dataFromView['password'], user.password): # 비밀번호에서 틀린 경우
        return HttpResponse(USER_MISMATCH_ERROR)
    
    token = TokenObtainPairSerializer.get_token(user)
    access_token = str(token.access_token)
    refresh_token = str(token)
    res = {}
    res['userName'] = user.name
    res['userEmail'] = user.email
    res['userGender'] = user.gender
    res['userAge'] = user.age_range
    res['accessToken'] = access_token
    res['refreshToken']= refresh_token
    return HttpResponse(json.dumps(res))

@method_decorator(csrf_exempt, name='dispatch')
def getMyStocks(req): 
    response = {}
    dataFromView = json.loads(req.body)
    myStocks = USERASSET.objects.filter(email=dataFromView['email'])
    if(myStocks.exists()):
        response['result'] = serializers.serialize("json", myStocks)
        return HttpResponse(response['result'], content_type="application/json")
    else :
        return HttpResponse(NO_ASSET_ERROR)



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

    dbAssets = USERASSET.objects.filter(email=dataFromView['email'])
    codeList = []
    for asset in assets:
        codeList.append(asset['code'])

    if len(assets) < len(dbAssets): #제거
        #db에서 제거
        for asset in dbAssets:
            if(asset.code not in codeList):
                asset.delete()
    else:
        for asset in assets:
            USERASSET = USERASSET()
            if len(USERASSET.objects.filter(email = dataFromView['email'],code = asset['code']))>0 :  #이미 있으면 수정
                item = USERASSET.objects.get(email = dataFromView['email'], code = asset['code'])
                item.weight = asset['weight']
                item.amount = asset['amount']
                item.investmentperiod = asset['investmentPeriod']
                item.save()

            
            else : #없으면 삽입
                USERASSET.email = dataFromView['email']
                USERASSET.code = asset['code']
                USERASSET.name = asset['name']
                USERASSET.weight = asset['weight']
                USERASSET.amount = asset['amount']
                USERASSET.investmentperiod = asset['investmentPeriod']
                USERASSET.save()
    
    return HttpResponse("saved successfully")

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
    
