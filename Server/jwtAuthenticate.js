const jwt = require("jsonwebtoken");

const AUTHORIZATION_FAILED = 501;
var jwtAuthenticator = {
  createAccessToken: (email) => {
    const accessToken = jwt.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    return accessToken;
  },
  createRefreshToken: (req, email) => {
    const refreshToken = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "14d" }
    );
    if (req.session && req.session.refreshTokens) {
      req.session.refreshTokens.push(refreshToken);
    } else req.session.refreshTokens = [refreshToken];
    return refreshToken;
  },
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["accesstoken"];
    const refreshToken = req.headers["refreshtoken"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    console.log(accessToken);
    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      console.log("//accessToken 성공!");
      next();
    } catch (err) {
      console.log("//accessToken 실패!");
      try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        next();
      } catch (err) {
        console.log("//refreshToken 실패!");
        res.json({
          success: false,
          errCode: AUTHORIZATION_FAILED,
          message: "No authorized",
        });
      }
    }
  },
};

module.exports = jwtAuthenticator;
