//this is for node js serving for react front server api

require("dotenv").config();

NO_USER_ERROR = 500;
USER_EXISTS_ERROR = 501;

/* 비밀번호 암호화 */

/*jwt 인증 */
const AuthModel = require("./Models/AuthModel");

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 8000;
const request = require("request");

const UserAssetModel = require("./Models/UserAssetModel");
const LoginModel = require("./Models/LoginModel");
const StockModel = require("./Models/StockModel");
const NotiModel = require("./Models/NotiModel");

/*db 커넥션 */
const DBConnector = require(__dirname + "/DBConnector");
const conn = DBConnector.init();
DBConnector.initSession(app);

UserAssetModel.init(DBConnector);
LoginModel.init(DBConnector);
StockModel.init(DBConnector);
NotiModel.init(DBConnector);
/*db 커넥션 */

/*cors 설정 */
const whitelist = [
  "http://localhost:3000",
  "http://localhost:8000",
  "http://172.30.1.29:8000",
  "http://172.30.1.29:3000",
];
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
  const { name, email, password, age, gender } = req.body;
  LoginModel.registerWithEmail(
    { name, email, password, age, gender },
    (result) => {
      if (result) {
        res.json({ success: true, message: "회원가입에 성공했습니다" });
      } else {
        res.json({ success: false, message: "이미 존재하는 사용자입니다." });
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
  const { profile_image } = userInfo.properties;
  const { email } = userInfo.kakao_account;
  LoginModel.loginWithKakao(
    { userInfo, profile_image, email },
    (result, data) => {
      if (result) {
        res.json({ success: true, data: data });
      } else {
        res.json({ success: false, data: data });
      }
    }
  );
});

app.post("/loginWithEmail", async (req, res) => {
  const { email, password } = req.body;
  const refreshToken = AuthModel.createRefreshToken(req, email);

  LoginModel.loginWithEmail(
    { email, password, refreshToken },
    (result, data) => {
      if (result) {
        res.json({ success: true, data: data });
      } else res.json({ success: false, message: "password is wrong" });
    }
  );
});

app.post("/getUserAssets", AuthModel.authenticateToken, (req, res) => {
  const { userInfo } = req.body;
  UserAssetModel.getUserAssets(userInfo.email, (result, rows) => {
    if (result) {
      res.json({ success: true, data: rows });
    } else res.json({ success: false, message: "User Assets are not exist" });
  });
});
app.post("/getRefreshToken", (req, res) => {
  res.send(AuthModel.createRefreshToken(req, req.body.email));
});
app.post("/getAccessToken", (req, res) => {
  console.log(req.body);
  res.send(AuthModel.createAccessToken("coolguysiun@naver.com"));
});

app.get("/getAllStocks", async (req, res) => {
  StockModel.getAllStocks((result, data) => {
    if (result) {
      res.json({ success: true, data: data });
    } else {
      res.json({ success: false, message: "Stocks are not exist" });
    }
  });
});

app.post("/saveUserAsset", AuthModel.authenticateToken, (req, res) => {
  const { userInfo, assets } = req.body;
  UserAssetModel.setUserAsset(userInfo.email, assets, (result) => {
    console.log("result!", result);
    if (result) res.json({ success: true, message: "saved succesfully" });
    else res.json({ success: false, message: "save failed" });
  });
});

app.post("/getUserAssetRetArray", AuthModel.authenticateToken, (req, res) => {
  const { userInfo } = req.body;
  UserAssetModel.getUserAssetRetArray(userInfo.email, (result, obj) => {
    console.log("result");
    if (result) {
      res.json({ success: true, date: obj.date, mean: obj.mean });
    } else {
      res.json({ success: false, message: "User Assets are not exist" });
    }
  });
});

app.post(
  "/getUserAssetPerformance",
  AuthModel.authenticateToken,
  (req, res) => {
    const { userInfo } = req.body;
    UserAssetModel.getUserAssetRetArray(userInfo.email, (result, obj) => {
      console.log(result);
      if (result) {
        const mean_ = obj.mean.reduce((a, b) => a + b, 0) / obj.mean.length;
        const std = Math.sqrt(
          obj.mean.map((x) => Math.pow(x - mean_, 2)).reduce((a, b) => a + b) /
            obj.mean.length
        );
        const sharpe = (mean_ - 0.03) / std;
        const mdd =
          (Math.abs(Math.min(...obj.mean)) / Math.max(...obj.mean) - 1) * 100;
        res.json({
          success: true,
          mean: mean_,
          std: std,
          sharpe: sharpe,
          mdd: mdd,
        });
      } else {
        res.json({ success: false, message: "fail" });
      }
    });
  }
);

app.post("/getNaverNews", function (req, res) {
  const { keyword } = req.body;
  var api_url =
    "https://openapi.naver.com/v1/search/blog?query=" + encodeURI(keyword); // JSON 결과
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_SEARCH_API_KEY,
      "X-Naver-Client-Secret": process.env.NAVER_SEARCH_API_SEC,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.get("/getNoti", (req, res) => {
  console.log("asdasd");
  NotiModel.getAllNotis((result, data) => {
    res.json({ success: result, notis: data });
  });
});

app.post("/getGMVResult", (req, res) => {
  //const {}
});
