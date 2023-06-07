class StockModel {
  init(DBConnector) {
    this.DBConnector = DBConnector;
    this.conn = this.DBConnector.init();
    this.DBConnector.connect(this.conn);
  }
  getAllStocks = async (callback) => {
    this.DBConnector.sendQuery(
      this.conn,
      `SELECT * FROM KRXSTOCKS;`,
      (rows) => {
        //회원정보가 있다는 뜻이므로 jwt토큰을 생성해 전달
        if (rows.length > 0) {
          callback(true, rows);
        } else callback(false);
      }
    );
  };
}

module.exports = new StockModel();
