const path = require('path');

const webpack = require('webpack');
const Define = webpack.DefinePlugin;
const { CleanWebpackPlugin: Clean } = require('clean-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const Html = require('html-webpack-plugin');
const firewall = require('@funboxteam/webpack-dev-server-firewall');

const resolveByRoot = x => path.resolve(__dirname, '..', ...x.split('/'));

const basePath = process.env.BASE_PATH || '/';
const outputPath = resolveByRoot('public');

module.exports = {
  entry: {
    app: resolveByRoot('src/app.jsx')
  },

  output: {
    path: outputPath,
    publicPath: basePath,
    uniqueName: 'app',
    filename: 'static/[name].js',
  },

  mode: 'development', 

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
  },

  module: {
    rules: [
    ],
  },

  plugins: [
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

  devtool: 'eval',

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    before: firewall,
    contentBase: outputPath,
    historyApiFallback: true,
    hot: true,
  },
}
