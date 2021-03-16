const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/postal-transaction-generator-ws',
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
    })
  );
  app.use(
    '/postal-update-ws',
    createProxyMiddleware({
      target: 'http://internal-apex-pu-int-alb-1013795657.eu-west-1.elb.amazonaws.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/apex-frontend',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
    })
  );
};
