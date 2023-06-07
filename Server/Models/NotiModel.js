class NotiModel {
  init(DBConnector) {
    this.DBConnector = DBConnector;
    this.conn = this.DBConnector.init();
    this.DBConnector.connect(this.conn);
  }
  getAllNotis = async (callback) => {
    const nowDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    this.DBConnector.sendQuery(
      this.conn,
      `SELECT * FROM NOTI WHERE end_date > '${nowDate}'`,
      (rows) => {
        callback(true, rows);
      }
    );
  };
}

module.exports = new NotiModel();
