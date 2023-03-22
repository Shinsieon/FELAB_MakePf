const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("setupproxy 타나?");
  app.use(
    "/apiHome",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
