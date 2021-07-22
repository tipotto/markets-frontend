const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');

module.exports = (config, env) => {
  if (env !== 'production') return config;

  config.plugins = config.plugins.concat([
    new PrerenderSPAPlugin({
      routes: ['/', '/analyze'],
      staticDir: path.join(__dirname, 'build'),
    }),
  ]);

  return config;
};
