module.exports = {
  extends: '@funboxteam/eslint-config',
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-curly-spacing': ['error', {
      children: {
        when: 'never',
        allowMultiline: false,
      }
    }],
    'react/jsx-indent': ['error', 2, {
      indentLogicalExpressions: true,
    }],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.dev.js',
      },
    },
  },
};
