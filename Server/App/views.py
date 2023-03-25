from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from pykrx import stock 
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Usertbl
from .models import UserStocks
# Create your views here.
def apiHome(request):
    print("hello apiHome is called")
    return HttpResponse("DJANGO API")

@method_decorator(csrf_exempt, name='dispatch')
def kakaoLoginDone(request):
    data = json.loads(request.body)
    usertbl = Usertbl()
    userStocks = UserStocks()
    userStocks.email = data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else ""
    usertbl.k_name = data['userInfo']['properties']['nickname']
    usertbl.k_email = data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else ""
    usertbl.k_image = data['userInfo']['properties']['profile_image']
    usertbl.k_gender = data['userInfo']['kakao_account']['gender']
    usertbl.k_age_range = data['userInfo']['kakao_account']['age_range']
    print(data)
    if(len(Usertbl.objects.filter(k_email = (data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else "")))==0):
        usertbl.save()

    if(len(UserStocks.objects.filter(email = (data['userInfo']['kakao_account']['email'] if 'has_email' in data['userInfo']['kakao_account'] else "")))==0):
        userStocks.save()
    return HttpResponse(json.dumps(data))



















    

def getStocks(request):
    today = datetime.today().strftime("%Y%m%d")    # YYYYmmddHHMMSS 형태의 시간 출력
    stocks = {}
    tickers = stock.get_market_ticker_list(today)
    for ticker in tickers:
        name = stock.get_market_ticker_name(ticker)
        stocks[ticker] = name
    return HttpResponse(json.dumps(stocks))
