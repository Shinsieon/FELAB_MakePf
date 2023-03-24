from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from pykrx import stock 
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Usertbl
# Create your views here.
def apiHome(request):
    print("hello apiHome is called")
    return HttpResponse("DJANGO API")

@method_decorator(csrf_exempt, name='dispatch')
def kakaoLoginDone(request):
    data = json.loads(request.body)
    usertbl = Usertbl()
    usertbl.k_name = data['userInfo']['nickname']
    usertbl.k_email = data['userInfo']['email'] if 'email' in data['userInfo'] else ""
    usertbl.save()
    print(Usertbl.objects.all())
    return HttpResponse("kakao login done")

def getStocks(request):
    today = datetime.today().strftime("%Y%m%d")    # YYYYmmddHHMMSS 형태의 시간 출력
    stocks = {}
    tickers = stock.get_market_ticker_list(today)
    for ticker in tickers:
        name = stock.get_market_ticker_name(ticker)
        stocks[ticker] = name
    return HttpResponse(json.dumps(stocks))
