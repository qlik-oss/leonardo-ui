const path = require('path');

const port = process.env.PORT || 19001;

module.exports = function initConfig() {
  return {
    // directConnect: true,
    artifactsPath: path.resolve(__dirname, './artifacts'),
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: [
          '--disable-gpu',
          '--no-sandbox',
          '--headless',
        ],
      },
    },
    specs: [path.resolve(__dirname, './components.spec.js')],
    configureHttpServer() {
      return {
        http: {
          port,
          host: '0.0.0.0',
        },
      };
    },
  };
};
