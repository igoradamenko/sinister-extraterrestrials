const path = require('path');

const webpack = require('webpack');
const Define = webpack.DefinePlugin;
const Provide = webpack.ProvidePlugin;
const { CleanWebpackPlugin: Clean } = require('clean-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const Html = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const Copy = require('copy-webpack-plugin');
const Csso = require('csso-webpack-plugin').default;

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
    // TODO: move 'static' to variable
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

        styles: {
          test: /\.s?css$/,
          chunks: 'all',
          name: 'styles',
          enforce: true,
        },
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
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtract.loader,
          },
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

      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: 'static/fonts/[hash].[ext]',
        },
      },
    ],
  },

  plugins: [
    new Clean(),
    new MiniCssExtract({
      filename: 'static/[name].[contenthash:16].css',
      ignoreOrder: true,
    }),
    new Csso(),
    new Define({
      BASE_PATH: JSON.stringify(basePath),
    }),
    new Copy({
      patterns: [
        {
          from: resolveByRoot('src/static'), 
          to: resolveByRoot('public/static'),
        },
      ],
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
      inject: false,
    }),
  ],
}
