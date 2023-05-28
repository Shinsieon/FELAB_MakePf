//this is for node js serving for react front server api

require("dotenv").config();

NO_USER_ERROR = 500;
USER_EXISTS_ERROR = 501;

/* 비밀번호 암호화 */
const cryptoPassword = require("./cryptoPassword");

/*jwt 인증 */
const jwtAuthenticator = require("./jwtAuthenticate");

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 8000;
const request = require("request");

/*db 커넥션 */
const dbConnection = require(__dirname + "/dbConnection");
const conn = dbConnection.init();
dbConnection.initSession(app);
dbConnection.connect(conn);
/*db 커넥션 */

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
  console.log(email);
  await dbConnection.sendQuery(
    conn,
    `SELECT * FROM USERTBL WHERE email='${email}'`,
    async (rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.json({ success: false, message: "이미 존재하는 사용자입니다." });
      } else {
        await dbConnection.sendQuery(
          conn,
          `INSERT INTO USERTBL values ('${name}','${email.toLowerCase()}','${cryptoPassword(
            password
          )}','','${gender}','${age}','0');`,
          () => {
            res.json({ success: true, message: "회원가입에 성공했습니다" });
          }
        );
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
  const { nickname, profile_image } = userInfo.properties;
  const { email, gender, age } = userInfo.kakao_account; //카카오는 디비에 비번을 저장하지 않는다.
  await dbConnection.sendQuery(
    conn,
    `SELECT * FROM USERTBL WHERE email='${email.toLowerCase()}'`,
    async (rows) => {
      console.log(rows);
      if (rows.length > 0) {
        //Db에 이미지 업데이트
        if (profile_image) {
          console.log(profile_image);
          await dbConnection.sendQuery(
            conn,
            `UPDATE USERTBL SET image = '${profile_image}' WHERE email ='${email.toLowerCase()}'`
          );
        }
        res.json({
          success: true,
          userInfo: rows[0],
          accessToken: jwtAuthenticator.createAccessToken(email),
          refreshToken: jwtAuthenticator.createRefreshToken(req, email),
        });
      } else {
        //디비에 계정 생성
        res.json({
          success: false,
          userInfo: userInfo,
          errCode: NO_USER_ERROR,
          message: "No User",
        });
        // await dbConnection.sendQuery(
        //   conn,
        //   `INSERT INTO USERTBL values ('${nickname}','${email.toLowerCase()}','${cryptoPassword(
        //     password
        //   )}','${image}','${gender}','${age}');`,
        //   () => {}
        // );
      }
    }
  );
});

app.post("/loginWithEmail", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  await dbConnection.sendQuery(
    conn,
    `SELECT * FROM USERTBL WHERE email='${email.toLowerCase()}' and password='${cryptoPassword(
      password
    )}'`,
    (rows) => {
      //회원정보가 있다는 뜻이므로 jwt토큰을 생성해 전달
      if (rows.length > 0) {
        const refreshToken = jwtAuthenticator.createRefreshToken(req, email);
        res.json({
          success: true,
          userInfo: rows[0],
          accessToken: jwtAuthenticator.createAccessToken(),
          refreshToken: refreshToken,
        });
      } else res.json({ success: false, message: "password is wrong" });
    }
  );
});

const getUserAssets = (email, callback) => {
  dbConnection.sendQuery(
    conn,
    `SELECT * FROM USERASSET WHERE email='${email.toLowerCase()}';`,
    (rows) => {
      callback(rows);
    }
  );
};
app.post("/getUserAssets", jwtAuthenticator.authenticateToken, (req, res) => {
  const { userInfo } = req.body;
  getUserAssets(userInfo.email, (rows) => {
    res.json(rows);
  });
});
app.post("/getRefreshToken", (req, res) => {
  console.log(req.body);
  res.send(jwtAuthenticator.createRefreshToken(req, req.body.email));
});
app.post("/getAccessToken", (req, res) => {
  console.log(req.body);
  res.send(jwtAuthenticator.createAccessToken("coolguysiun@naver.com"));
});

app.get("/getAllStocks", async (req, res) => {
  await dbConnection.sendQuery(conn, `SELECT * FROM KRXSTOCKS;`, (rows) => {
    //회원정보가 있다는 뜻이므로 jwt토큰을 생성해 전달
    if (rows.length > 0) {
      res.json(rows);
    }
  });
});

app.post("/saveUserAsset", jwtAuthenticator.authenticateToken, (req, res) => {
  const { userInfo, assets } = req.body;
  console.log(req.body);
  const insertAssets = (assets) => {
    var query = "";
    for (var i = 0; i < assets.length; i++) {
      query += `('${userInfo.email.toLowerCase()}','${assets[i].code}','${
        assets[i].name
      }','${assets[i].weight}','${assets[i].amount}','${
        assets[i].investmentPeriod
      }')`;
      if (i === assets.length - 1) {
        query += ";";
      } else query += ",";
    }
    dbConnection.sendQuery(conn, `INSERT INTO USERASSET values ${query}`);
  };
  //기존에 자산이 있는 고객이면 delete 후 insert
  getUserAssets(userInfo.email, (rows) => {
    if (rows.length > 0) {
      dbConnection.sendQuery(
        conn,
        `DELETE FROM USERASSET WHERE email='${userInfo.email}';`,
        () => {
          insertAssets(assets);
        }
      );
    } else insertAssets(assets);
    res.json({ success: true, message: "saved succesfully" });
  });
});

const getUserAssetRetArray = (email, callback) => {
  var retResult = {};
  var invPer = 12; //최장기 투자기간

  dbConnection.sendQuery(
    conn,
    "SELECT Date, code, `Change` FROM KOSPI_M where code IN (select code from USERASSET where email='" +
      email +
      "');",
    (rows) => {
      if (!rows) return;
      console.log(rows);
      for (var i = 0; i < rows.length; i++) {
        var date = new Date(rows[i].Date).toLocaleDateString();
        if (retResult[date]) {
          retResult[date].push(rows[i]["Change"]);
        } else retResult[date] = [rows[i]["Change"]];
      }
      console.log(retResult);
      const investmentDate = Object.keys(retResult)
        .sort()
        .splice(Object.keys(retResult).length - invPer);
      var avgArr = [];
      for (var i = 0; i < invPer; i++) {
        if (retResult[investmentDate[i]]) {
          const average =
            retResult[investmentDate[i]].reduce((a, b) => a + b, 0) /
            retResult[investmentDate[i]].length;
          avgArr.push(average);
        }
      }
      callback({ date: investmentDate, mean: avgArr });
    }
  );
};
app.post(
  "/getUserAssetRetArray",
  jwtAuthenticator.authenticateToken,
  (req, res) => {
    const { userInfo } = req.body;
    getUserAssetRetArray(userInfo.email, ({ date, mean }) => {
      res.json({ success: true, date: date, mean: mean });
    });
  }
);

app.post(
  "/getUserAssetPerformance",
  jwtAuthenticator.authenticateToken,
  (req, res) => {
    const { userInfo } = req.body;
    getUserAssetRetArray(userInfo.email, ({ date, mean }) => {
      const mean_ = mean.reduce((a, b) => a + b, 0) / mean.length;
      const std = Math.sqrt(
        mean.map((x) => Math.pow(x - mean_, 2)).reduce((a, b) => a + b) /
          mean.length
      );
      const sharpe = (mean_ - 0.03) / std;
      const mdd = (Math.abs(Math.min(...mean)) / Math.max(...mean) - 1) * 100;
      res.json({
        success: true,
        mean: mean_,
        std: std,
        sharpe: sharpe,
        mdd: mdd,
      });
    });
  }
);

app.post(
  "/getIndivisualPerformance",
  jwtAuthenticator.authenticateToken,
  (req, res) => {}
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
