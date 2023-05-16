//this is for node js serving for react front server api

require("dotenv").config();
/*db 커넥션 */
const dbConnection = require(__dirname + "/dbConnection");
const conn = dbConnection.init();
dbConnection.connect(conn);
/*db 커넥션 */

/* 비밀번호 암호화 */
const cryptoPassword = require("./cryptoPassword");

/*jwt 인증 */
const jwt = require("jsonwebtoken");
const jwtAuthenticator = require("./jwtAuthenticate");

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 8000;

/*cors 설정 */
const whitelist = ["http://localhost:3000", "http://localhost:8000"];
const corsOptions = {
  origin: (origin, callback) => {
    console.log("trying origin " + origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin"));
    }
  },
};
var cors = require("cors");
app.use(cors(corsOptions));
app.use(express.json());
/*cors 설정 */

//app.use(express.static(path.join(__dirname, "front/dist")));

app.listen(port, () => {
  console.log("app is listening " + port);
});

app.post("/registerWithEmail", async (req, res) => {
  //이미 가입된 내역이 있는지 이메일로 비교
  console.log(req.body);
  const { name, email, password, age, gender } = req.body;
  await dbConnection.sendQuery(
    conn,
    `SELECT * FROM USERTBL WHERE email=${email}`,
    (rows) => {
      if (rows) {
        res.statusMessage("USER EXISTS");
      } else {
        //await dbConnection.sendQuery(conn. `INSERT INTO `)
      }
    }
  );
});

/*
카카오 로그인은 계정이 Db 에 없으면 Insert, 있으면 계정 정보 return
params : 
nickname : string 
email : string
profile_image : image link
gender : M || F
age : 10~19, 20~29, 30~39, 40~49, 50~59
*/
app.post("/loginWithKakao", async (req, res) => {
  const { userInfo } = req.body;
  const { nickname, image } = userInfo.properties;
  const { email, gender, age } = userInfo.kakao_account; //카카오는 디비에 비번을 저장하지 않는다.
  await dbConnection.sendQuery(
    conn,
    `SELECT * FROM USERTBL WHERE email=${email}`,
    (rows) => {
      if (rows.length > 0) {
        res.json({
          userInfo: rows[0],
          accessToken: jwtAuthenticator.createToken(),
        });
      } else {
        //디비에 계정 생성
      }
    }
  );

  res.json({ message: "hello world" });
});

app.post("/loginWithEmail", async (req, res) => {
  const { email, password } = req.body;
  await dbConnection.sendQuery(
    conn,
    `SELECT * FROM USERTBL WHERE email='${email}'`,
    (rows) => {
      //회원정보가 있다는 뜻이므로 jwt토큰을 생성해 전달
      if (rows.length > 0)
        res.json({
          userInfo: rows[0],
          accessToken: jwtAuthenticator.createToken(),
        });
      else res.json({ message: "no user" });
    }
  );
});

app.post(
  "/getUserAssets",
  jwtAuthenticator.authenticateToken,
  async (req, res) => {
    conn.query("SELECT * FROM USERASSET", (err, rows, fields) => {
      if (err) console.log("query error");
      else {
        console.log(rows);
      }
    });
    // let result = await sendQuery(getDbConnection(), "SELECT * FROM USERASSET");
    // return result.json();
  }
);

app.get("/getAllStocks", (req, res) => {
  res.json({ msg: "hello" });
});

app.post("/saveUserAsset", (req, res) => {});

app.get("/getUserAssetRetArray", (req, res) => {});

app.get("/getUserAssetPerformance", (req, res) => {});

app.get("/getIndivisualPerformance", (req, res) => {});
