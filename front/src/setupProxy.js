const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/apiHome",
    createProxyMiddleware({
      // 👇️ make sure to update your target
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
