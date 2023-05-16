//this is for node js serving for react front server api

/*db 커넥션 */
const dbConnection = require(__dirname + "/dbConnection");
const conn = dbConnection.init();
dbConnection.connect(conn);
/*db 커넥션 */
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

app.get("/api", (req, res) => {
  res.json({ message: "hello world" });
});
app.listen(port, () => {
  console.log("app is listening " + port);
});

app.post("/registerWithEmail", (req, res) => {
  //이미 가입된 내역이 있는지 이메일로 비교
  console.log(req);
});

app.get("/getRefreshToken", (req, res) => {});

/*
카카오 로그인은 계정이 Db 에 없으면 Insert, 있으면 계정 정보 return
params : 
nickname : string 
email : string
profile_image : image link
gender : M || F
age : 10~19, 20~29, 30~39, 40~49, 50~59
*/
app.post("/loginWithKakao", (req, res) => {
  const body = req.body;
  const { userInfo, userToken } = body;
  const userName = userInfo.properties.nickname;
  const userEmail = userInfo.kakao_account.has_email
    ? userInfo.kakao_account.email
    : "";
  const image = userInfo.properties.profile_image;
  const gender = userInfo.kakao_account.gender;
  const age = userInfo.kakao_account.age_range;
  dbConnection.sendQuery(`SELECT * FROM USERTBL WHERE email=${userEmail}`);
  // conn.query(
  //   "INSERT INTO USERTBL (name, email, password, image, gender, age_range, is_super) values " +
  //     "SELECT"
  // );

  res.json({ message: "hello world" });
});

app.post("/loginWithEmail", async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const rows = await dbConnection.sendQuery(
    conn,
    `SELECT * FROM USERTBL WHERE email='${email}'`,
    (rows) => {
      res.send(rows[0]);
    }
  );
});

app.post("/getUserAssets", async (req, res) => {
  conn.query("SELECT * FROM USERASSET", (err, rows, fields) => {
    if (err) console.log("query error");
    else {
      console.log(rows);
    }
  });
  // let result = await sendQuery(getDbConnection(), "SELECT * FROM USERASSET");
  // return result.json();
});

app.get("/getAllStocks", (req, res) => {});

app.post("/saveUserAsset", (req, res) => {});

app.get("/getUserAssetRetArray", (req, res) => {});

app.get("/getUserAssetPerformance", (req, res) => {});

app.get("/getIndivisualPerformance", (req, res) => {});
