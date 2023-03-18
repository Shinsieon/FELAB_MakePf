from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from pykrx import stock 

# Create your views here.
def apiHome(request):
    print("hello apiHome is called")
    return HttpResponse("DJANGO API")

def getStocks(request):
    today = datetime.today().strftime("%Y%m%d")    # YYYYmmddHHMMSS 형태의 시간 출력
    stocks = {}
    tickers = stock.get_market_ticker_list(today)
    for ticker in tickers:
        name = stock.get_market_ticker_name(ticker)
        stocks[ticker] = name
    return stocks
