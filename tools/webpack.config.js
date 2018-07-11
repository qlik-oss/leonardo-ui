const autoprefixer = require('autoprefixer');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcDir = path.resolve(__dirname, '../src');
const nodeDir = path.resolve(__dirname, '../node_modules');
const distDir = path.resolve(__dirname, '../dist');

const createConfig = function createConfig(isDebug) {
  const config = {
    mode: isDebug ? 'development' : 'production',
    context: path.resolve(__dirname, '../src'),
    entry: {
      'leonardo-ui': './leonardo-ui'
    },
    output: {
      path: distDir,
      filename: '[name].js',
      library: 'leonardoui',
      libraryTarget: 'umd',
      publicPath: '/leonardo-ui/'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015'
            ]
          }
        },
        include: [srcDir],
        exclude: [nodeDir]
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { minimize: !isDebug }
          }, {
            loader: 'postcss-loader',
            options: { plugins: [autoprefixer] }
          }, {
            loader: 'less-loader',
            options: { strictMath: true }
          }
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: isDebug ? '[name].css' : '[name].min.css' }),
      new CopyWebpackPlugin([{
        from: 'colors.less',
        to: 'colors.less'
      }, {
        from: 'variables.less',
        to: 'variables.less'
      }, {
        from: 'resources/lui-icons.ttf',
        to: 'lui-icons.ttf'
      }, {
        from: 'resources/lui-icons.woff',
        to: 'lui-icons.woff'
      }])
    ]
  };

  if (isDebug) {
    config.devtool = 'source-map';
  } else {
    config.output.filename = '[name].min.js';
    config.optimization = {
      minimizer: [new UglifyJsPlugin()]
    };
  }

  return config;
};

module.exports = [
  createConfig(true),
  createConfig(false)
];
