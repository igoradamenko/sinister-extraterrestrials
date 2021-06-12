const babelRuntimeVersion = require('./package').dependencies['@babel/runtime'];

module.exports = {
  presets: [
    ['@babel/preset-env', { 
      modules: false,
      useBuiltIns: 'usage',
      corejs: 3, 
    }],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    '@babel/plugin-transform-react-constant-elements',
    'react-hot-loader/babel',
  ],
  env: {
    production: {
      plugins: [
        ['@babel/plugin-transform-runtime', { version: babelRuntimeVersion }],
        'transform-react-remove-prop-types',
      ],
    },
  },
};
