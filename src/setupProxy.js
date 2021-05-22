const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api/v1/search',
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_API,
      changeOrigin: true,
    }),
  );
};
