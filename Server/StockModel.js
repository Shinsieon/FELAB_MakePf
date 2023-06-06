class StockModel {
  init(dbConnection) {
    this.dbConnection = dbConnection;
    this.conn = this.dbConnection.init();
    this.dbConnection.connect(this.conn);
  }
  getAllStocks = async (callback) => {
    dbConnection.sendQuery(conn, `SELECT * FROM KRXSTOCKS;`, (rows) => {
      //회원정보가 있다는 뜻이므로 jwt토큰을 생성해 전달
      if (rows.length > 0) {
        callback(true, rows);
      } else callback(false);
    });
  };
}

module.exports = new StockModel();
