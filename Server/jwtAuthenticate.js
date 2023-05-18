const jwt = require("jsonwebtoken");

var jwtAuthenticator = {
  createToken: (email) => {
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
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.json({ success: false, message: "access token is fired" });
      req.user = user;
      next();
    });
  },
  authenticateRefreshToken: async (token, email) => {
    //const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
      const data = await getAsync(email);
      if (token === data) {
        try {
          jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
          return true;
        } catch (err) {
          return false;
        }
      } else return false;
    } catch (err) {
      return false;
    }
  },
};

module.exports = jwtAuthenticator;
