module.exports = {
  '*.{js,jsx}': [
    'eslint --fix --cache -c .eslintrc.js',
  ],
  '*.scss': [
    'stylelint --fix --syntax scss --cache --config node_modules/@funboxteam/scss-lint-config/.stylelintrc',
  ],
};
