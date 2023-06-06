const cryptoPassword = require("./cryptoPassword");
const jwtAuthenticator = require("./jwtAuthenticate");
class LoginModel {
  init(dbConnection) {
    this.dbConnection = dbConnection;
    this.conn = this.dbConnection.init();
    this.dbConnection.connect(this.conn);
  }
  registerWithEmail = async (
    { name, email, password, age, gender },
    callback
  ) => {
    this.dbConnection.sendQuery(
      this.conn,
      `SELECT * FROM USERTBL WHERE email='${email}'`,
      async (rows) => {
        if (rows.length > 0) {
          callback(false);
        } else {
          this.dbConnection.sendQuery(
            this.conn,
            `INSERT INTO USERTBL values ('${name}','${email.toLowerCase()}','${cryptoPassword(
              password
            )}','','${gender}','${age}');`,
            () => {
              callback(true);
            }
          );
        }
      }
    );
  };
  loginWithKakao = async ({ userInfo, profile_image, email }, callback) => {
    this.dbConnection.sendQuery(
      this.conn,
      `SELECT * FROM USERTBL WHERE email='${email.toLowerCase()}'`,
      async (rows) => {
        if (rows.length > 0) {
          //Db에 이미지 업데이트
          if (profile_image) {
            this.dbConnection.sendQuery(
              this.conn,
              `UPDATE USERTBL SET image = '${profile_image}' WHERE email ='${email.toLowerCase()}'`
            );
          }
          callback(true, {
            success: true,
            userInfo: rows[0],
            accessToken: jwtAuthenticator.createAccessToken(email),
            refreshToken: jwtAuthenticator.createRefreshToken(req, email),
          });
        } else {
          //디비에 계정 생성
          callback(false, {
            success: false,
            userInfo: userInfo,
            errCode: NO_USER_ERROR,
            message: "No User",
          });
        }
      }
    );
  };
  loginWithEmail = async ({ email, password, refreshToken }, callback) => {
    this.dbConnection.sendQuery(
      this.conn,
      `SELECT * FROM USERTBL WHERE email='${email.toLowerCase()}' and password='${cryptoPassword(
        password
      )}'`,
      (rows) => {
        if (rows.length > 0) {
          callback(true, {
            success: true,
            userInfo: rows[0],
            accessToken: jwtAuthenticator.createAccessToken(),
            refreshToken: refreshToken,
          });
        } else callback(false);
      }
    );
  };
}

module.exports = new LoginModel();
