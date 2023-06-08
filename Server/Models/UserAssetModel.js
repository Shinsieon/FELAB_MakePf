/*db 커넥션 */
class UserAssetModel {
  init(DBConnector) {
    this.userAsset = {};
    this.userAssetSise = {};
    this.DBConnector = DBConnector;
    this.conn = this.DBConnector.init();
    this.DBConnector.connect(this.conn);
  }
  setUserAsset = async (email, assets, callback) => {
    const insertAssets = (assets) => {
      var query = "";
      for (var i = 0; i < assets.length; i++) {
        query += `('${email.toLowerCase()}','${assets[i].code}','${
          assets[i].name
        }','${assets[i].weight}','${assets[i].amount}','${
          assets[i].investmentPeriod
        }')`;
        if (i === assets.length - 1) {
          query += ";";
        } else query += ",";
      }
      if (query === "") {
        //아무 자산이 없다면 다 제거
        this.DBConnector.sendQuery(
          this.conn,
          `DELETE FROM USERASSET WHERE email='${email.toLowerCase()}';`,
          () => {
            callback(true);
          }
        );
      } else {
        this.DBConnector.sendQuery(
          this.conn,
          `INSERT INTO USERASSET values ${query}`,
          (rows) => {
            this.getUserAssets(email, (result) => {
              if (result) callback(true);
              else callback(false);
            });
          }
        );
      }
    };
    //기존에 자산이 있는 고객이면 delete 후 insert
    this.getUserAssets(email, (rows) => {
      console.log(rows, email);

      if (rows) {
        this.DBConnector.sendQuery(
          this.conn,
          `DELETE FROM USERASSET WHERE email='${email.toLowerCase()}';`,
          () => {
            insertAssets(assets);
          }
        );
      } else insertAssets(assets);
    });
  };
  getUserAssets = (email, callback) => {
    this.DBConnector.sendQuery(
      this.conn,
      `SELECT * FROM USERASSET WHERE email='${email.toLowerCase()}';`,
      (rows) => {
        if (rows && callback) {
          callback(true, rows);
          this.userAsset = rows;
        } else callback(false);
      }
    );
  };
  getUserAssetSise = async (email, callback) => {
    await this.DBConnector.sendQuery(
      this.conn,
      "SELECT Date, code, `Change` FROM KOSPI_M where code IN (select code from USERASSET where email='" +
        email +
        "');",
      (rows) => {
        if (rows.length === 0) {
          callback(false);
        } else {
          this.userAssetSise = rows;

          callback(true, rows);
        }
      }
    );
  };
  getUserAssetRetArray = (email, callback) => {
    var invPer = 12; //1년치만 가져오기
    var retResult = {};
    //asset과 동시에 시세 정보도 로드한다.
    this.getUserAssetSise(email, (result, rows) => {
      if (result) {
        for (var i = 0; i < rows.length; i++) {
          var date = new Date(rows[i].Date).toLocaleDateString();
          if (retResult[date]) {
            retResult[date].push(rows[i]["Change"]);
          } else retResult[date] = [rows[i]["Change"]];
        }
        const investmentDate = Object.keys(retResult)
          .sort()
          .splice(Object.keys(retResult).length - invPer);
        console.log(investmentDate);
        var avgArr = [];
        for (var i = 0; i < invPer; i++) {
          if (retResult[investmentDate[i]]) {
            const average =
              retResult[investmentDate[i]].reduce((a, b) => a + b, 0) /
              retResult[investmentDate[i]].length;
            avgArr.push(average);
          }
        }
        callback(true, { date: investmentDate, mean: avgArr });
      } else {
        callback(false);
      }
    });
  };
  getUserAssetClose = (email, callback) => {};
}

module.exports = new UserAssetModel();
