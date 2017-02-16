const baseConfig = require('after-work.js/dist/config/conf.js').config;
const extend = require('extend');

delete baseConfig.multiCapabilities;

const config = extend(true, baseConfig, {
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    name: 'Chrome dev'
  }
});

module.exports = {
  config
};
