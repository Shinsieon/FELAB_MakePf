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
var cors = require("cors");

//app.use(express.static(path.join(__dirname, "front/dist")));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "hello world" });
});
app.listen(port, () => {
  console.log("app is listening");
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
age : 10, 20, 30, 40, 50
*/
app.get("/loginWithKakao", (req, res) => {
  var body = req.body;
  console.log(body);
});

app.get("/loginWithEmail", (req, res) => {});

app.get("/getUserAssets", async (req, res) => {
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
