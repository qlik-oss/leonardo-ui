const path = require('path');
const webpack = require('webpack');
const bs = require('browser-sync').create();

const config = require('./webpack.config');
const buildDocs = require('../docs/build').buildAll;
const buildFixtures = require('../test/fixtures/build').buildAll;

webpack(config).watch({
  aggregateTimeout: 300,
}, (err, stats) => {
  if (err) {
    console.log(err);
  } else if (stats.hasErrors()) {
    stats.toJson().errors.forEach((error) => {
      console.log(`\n${error}`);
    });
  } else if (stats.hasWarnings()) {
    stats.toJson().warnings.forEach((warn) => {
      console.log(`\n${warn}`);
    });
  } else {
    buildDocs();
    buildFixtures();
    console.log('Compile complete');
  }
});

bs.watch(`${path.resolve(__dirname, '../docs/src')}/**/*.*`, (event/* , file */) => {
  if (event === 'change') {
    buildDocs();
  }
});

bs.watch(`${path.resolve(__dirname, '../test/fixtures/src')}/**/*.*`, (event/* , file */) => {
  if (event === 'change') {
    buildFixtures();
  }
});

// Now init the Browsersync server
bs.init({
  open: false,
  notify: false,
  server: [
    path.resolve(__dirname, '../docs/dist'),
    path.resolve(__dirname, '../test/fixtures/dist'),
  ],
  port: 8080,
  ui: {
    port: 8081,
  },
});
