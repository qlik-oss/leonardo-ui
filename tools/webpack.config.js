const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');
const nodeDir = path.resolve(__dirname, '../node_modules');
const distDir = path.resolve(__dirname, '../dist');

const createConfig = function createConfig(isDebug) {
  const config = {
    context: path.resolve(__dirname, '../'),
    entry: {
      'leonardo-ui': path.resolve(srcDir, 'leonardo-ui')
    },
    output: {
      path: distDir,
      filename: '[name].js',
      library: 'leonardoui',
      libraryTarget: 'umd',
      publicPath: '/leonardo-ui/'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        include: [srcDir],
        exclude: [nodeDir],
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.less$/,
        loader: isDebug ? 'style!css!postcss!less?strictMath' : 'style!css?minimize!postcss!less?strictMath',
        include: [srcDir],
        exclude: [
          path.resolve(srcDir, 'leonardo-ui.less'),
          path.resolve(srcDir, '_colors.less'),
          path.resolve(srcDir, '_variables.less')
        ]
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(isDebug ? 'css!postcss!less?strictMath' : 'css?minimize!postcss!less?strictMath'),
        include: [path.resolve(srcDir, 'leonardo-ui.less')]
      }]
    },
    plugins: [
      new ExtractTextPlugin(isDebug ? '[name].css' : '[name].min.css')
    ],
    postcss: [autoprefixer({
      browsers: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'Explorer >= 10',
        'Safari >= 8.0',
        'iOS >= 9.0'
      ]
    })]
  };

  if (isDebug) {
    config.debug = true;
    config.devtool = 'source-map';
  } else {
    config.output.filename = '[name].min.js';
    config.plugins.push(new Webpack.optimize.UglifyJsPlugin());
  }

  return config;
};

module.exports = [
  createConfig(true),
  createConfig(false)
];
