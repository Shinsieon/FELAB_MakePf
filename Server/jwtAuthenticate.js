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
  createRefreshToken: (email) => {
    const refreshToken = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "14days" }
    );
    return refreshToken;
  },
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
};

module.exports = jwtAuthenticator;
