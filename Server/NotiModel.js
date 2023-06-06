class NotiModel {
  init(dbConnection) {
    this.dbConnection = dbConnection;
    this.conn = this.dbConnection.init();
    this.dbConnection.connect(this.conn);
  }
  getAllNotis = async (callback) => {
    const nowDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    this.dbConnection.sendQuery(
      this.conn,
      `SELECT * FROM NOTI WHERE end_date > '${nowDate}'`,
      (rows) => {
        callback(true, rows);
      }
    );
  };
}

module.exports = new NotiModel();
