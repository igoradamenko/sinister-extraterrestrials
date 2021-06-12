const path = require('path');

const webpack = require('webpack');
const Define = webpack.DefinePlugin;
const Provide = webpack.ProvidePlugin;
const { CleanWebpackPlugin: Clean } = require('clean-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const Html = require('html-webpack-plugin');
const firewall = require('@funboxteam/webpack-dev-server-firewall');

const resolveByRoot = x => path.resolve(__dirname, '..', ...x.split('/'));

const basePath = process.env.BASE_PATH || '/';
const outputPath = resolveByRoot('public');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      resolveByRoot('src/app.jsx'),
    ],
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
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
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
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('postcss-url')({
                    url: 'inline',
                    maxSize: 5,
                  }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                includePaths: [resolveByRoot('src')],
              },
            },
          },
          '@funboxteam/scss-vars-loader',
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: 'static/images/[hash].[ext]',
        },
      },
    ],
  },

  plugins: [
    new Define({
      BASE_PATH: JSON.stringify(basePath),
    }),
    new Provide({
      React: 'react',
      Component: ['react', 'Component'],
      PureComponent: ['react', 'PureComponent'],
      Fragment: ['react', 'Fragment'],
      PropTypes: 'prop-types',

      b: 'bem-react-helper',
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


  // fix for broken devServer browserslistrc recognition
  // see: https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-706840237
  target: 'web',
}
