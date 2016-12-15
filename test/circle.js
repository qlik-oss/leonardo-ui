const baseConfig = require('after-work.js/dist/config/conf.js').config;
const extend = require('extend');

delete baseConfig.multiCapabilities;

const config = extend(true, baseConfig, {
  chromeDriver: '../node_modules/after-work.js/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.24',
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    name: 'Chrome dev'
  }
});

module.exports = {
  config
};
