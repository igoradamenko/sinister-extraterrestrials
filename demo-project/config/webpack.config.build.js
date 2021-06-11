const path = require('path');

const webpack = require('webpack');
const Define = webpack.DefinePlugin;
const { CleanWebpackPlugin: Clean } = require('clean-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const Html = require('html-webpack-plugin');

const resolveByRoot = x => path.resolve(__dirname, '..', ...x.split('/'));

const basePath = process.env.BASE_PATH || '/';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: resolveByRoot('src/app.jsx')
  },

  output: {
    path: resolveByRoot('public'),
    publicPath: basePath,
    uniqueName: 'app',
    filename: 'static/[name].[contenthash].js',
  },

  mode: isProduction ? 'production' : 'development', 

  bail: true,

  resolve: {
    modules: [resolveByRoot('src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: false,
      },
    },
    minimize: isProduction,
    concatenateModules: true,
    usedExports: true,
    sideEffects: true,

    nodeEnv: process.env.NODE_ENV,

    minimizer: [
      new Terser({
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },

  module: {
    rules: [
    ],
  },

  plugins: [
    new Clean(),
    new Define({
      BASE_PATH: JSON.stringify(basePath),
    }),
    new Html({
      template: resolveByRoot('src/index.ejs'),
      minify: {
        removeScriptTypeAttributes: true,
      },
      scriptLoading: 'blocking',
    }),
  ],
}
