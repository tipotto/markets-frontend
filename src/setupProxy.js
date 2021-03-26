const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  console.log("REACT_APP_BACKEND_API", process.env.REACT_APP_BACKEND_API);
  app.use(
    "/api/search/v1",
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_API,
      changeOrigin: true,
    })
  );
};
