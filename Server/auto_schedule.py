import schedule
import time
#특정 함수 정의
import pymysql
from datetime import datetime, timedelta
#import FinanceDataReader as fdr
import requests
import pandas as pd
from io import BytesIO
import numpy as np
from datetime import datetime
import time
from sqlalchemy import create_engine 
import sys, traceback
import logging

class autoUpdate:
    def startConnection(self):
        self.conn = pymysql.connect(host='localhost', user='root', password='su970728!', db='PORTFOLIO')
        self.engine= create_engine('mysql+pymysql://root:su970728!@localhost:3306/PORTFOLIO') #pymysql로 작성시 error
        self.curs = self.conn.cursor()
    def getOhlcvWithReturn(self,code):
        today = datetime.today().strftime("%Y%m%d") 
        df = stock.get_market_ohlcv("20130101", today, code,"m") #월별 시고저종+ 거래량
db = autoUpdate()
db.startConnection()