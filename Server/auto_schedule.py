import schedule
#특정 함수 정의
import pymysql
from datetime import datetime
#import FinanceDataReader as 
from pykrx import stock 
import pandas as pd
import numpy as np
import time
from sqlalchemy import create_engine 
import FinanceDataReader as fdr

class dbConn:
    def startConnection(self):
        self.conn = pymysql.connect(host='localhost', user='root', password='su970728!', db='foliogram')
        self.engine= create_engine('mysql+pymysql://root:su970728!@localhost:3306/foliogram') #pymysql로 작성시 error
        self.curs = self.conn.cursor()
        print(self.curs)

class autoUpdate:
    def __init__(self):
        self.startDate =  "20130101"#10년전
        self.endDate = datetime.today().strftime("%Y%m%d") 

    
    def getListOfKospi(self):
        return stock.get_market_ticker_list()
        
    def getOhlcvWithReturn(self):
        df = stock.get_market_ohlcv(self.startDate, self.endDate, "005930","m") #월별 시고저종+ 거래량
        print(df)
        
    def getKospiClose(self):
        result_df = pd.DataFrame()
        process_num = 0
        stnd_date = "2013-01-01"
        end_date = datetime.today().strftime("%Y%m%d")
        stock_list = stock.get_market_ticker_list()
        stock_list_len = len(stock_list)

        for code in stock_list:
            df = fdr.DataReader(code, stnd_date, end_date)['Close']
            df = pd.DataFrame(df.tolist(), index=df.index, columns=[code])
            result_df = pd.concat([result_df, df],join='outer', axis=1)
            process_num+=1
            time.sleep(1)
            print(str(process_num) + "/ " + str(stock_list_len))
            if(process_num == 10):
                break

    def getKRXCodes(self):
        stocks = fdr.StockListing('KRX') # 코스피, 코스닥, 코넥스 전체
        stocks[['Code', 'ISU_CD', 'Name', 'Market']]
        # db_connection_str = 'mysql+pymysql://root:su970728!@localhost:3306/foliogram'
        # db_connection = create_engine(db_connection_str)
        # conn = db_connection.connect()
        # result_df.to_sql(name='KOSPI', con=db_connection, if_exists='append',index=True)
    
    def getKospiFundamental(self):
        result_df = pd.DataFrame()
        process_num = 0
        stnd_date = "2022-01-01"
        end_date = datetime.today().strftime("%Y%m%d")
        stock_list = stock.get_market_ticker_list()
        stock_list_len = len(stock_list)

        for code in stock_list:
            df = stock.get_market_fundamental(stnd_date, end_date,code,freq='m')
            df = df.reset_index()
            df['code'] = code
            result_df = pd.concat([result_df, df], axis=0)
            process_num+=1
            time.sleep(1)
            print(str(process_num) + "/ " + str(stock_list_len))

            
db = autoUpdate()
db.getOhlcvWithReturn()