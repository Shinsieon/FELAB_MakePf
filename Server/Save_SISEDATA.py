from pykrx import stock 
from datetime import datetime
import FinanceDataReader as fdr
import pandas as pd
import numpy as np
import time
from sqlalchemy import create_engine
import pymysql
import sys

class SAVE_SISEDATA:
    def __init__(self):
        self.startDate =  "20130101"#10년전
        self.endDate = datetime.today().strftime("%Y%m%d") 
        self.password = sys.argv[1]
        
    def get_Korea_stock_list(self):
        stocks = fdr.StockListing('KRX') # 코스피, 코스닥, 코넥스 전체
        stocks = stocks[['Code', 'ISU_CD', 'Name', 'Market']]
        print("get_Korea_stock_list saved")
        self.saveDB(stocks, "KRXSTOCKS")


    def get_monthly_kospi_sise(self):
        result_df = pd.DataFrame()
        process_num = 0
        stock_list = stock.get_market_ticker_list()
        stock_list_len = len(stock_list)

        for code in stock_list:
            df = fdr.DataReader(code, self.startDate, self.endDate)
            df = df.resample('1M').mean().reset_index()
            df['code'] = code
            result_df = pd.concat([result_df, df], axis=0)
            process_num+=1
            time.sleep(1)
            print(str(process_num) + "/ " + str(stock_list_len),flush=True)

        print("get_monthly_kospi_sise saved")
        self.saveDB(result_df, "KOSPI_M")
    def get_monthly_kospi_fundamental(self):
        result_df = pd.DataFrame()
        process_num = 0
        stock_list = stock.get_market_ticker_list()
        stock_list_len = len(stock_list)

        for code in stock_list:
            df = stock.get_market_fundamental("20210101", "20220101", code, freq="m")
            if(df.empty) :
                continue
            df = df.rename(columns = {'날짜' : 'Date'}, inplace = True)
            df['code'] = code
            result_df = pd.concat([result_df, df], axis=0)
            process_num+=1
            time.sleep(1)
            print(str(process_num) + "/ " + str(stock_list_len),flush=True)
        print("get_monthly_kospi_fundamental saved")
        self.saveDB(result_df, "KOSPI_FUNDAMENTAL_M")

    def saveDB(self, df, table_name):
        db_connection_str = 'mysql+pymysql://root:'+self.password+'@localhost:3306/foliogram'
        db_connection = create_engine(db_connection_str)
        conn = db_connection.connect()
        print(df)
        print(table_name)
        df.to_sql(name=table_name, con=db_connection, if_exists='append', index=True )

if __name__ == "__main__":
    cls = SAVE_SISEDATA()
    #cls.get_monthly_kospi_sise()
    cls.get_Korea_stock_list()
    #cls.get_monthly_kospi_fundamental()
