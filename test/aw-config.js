const baseConfig = require('after-work.js/dist/config/conf.js').config;
const extend = require('extend');

const config = extend(true, baseConfig, {
  server: {
    baseDir: './test/fixtures/dist'
  }
});

module.exports = {
  config
};
