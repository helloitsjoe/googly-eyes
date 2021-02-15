/* eslint-env node */
const path = require('path');
const prodConfig = require('./webpack.config');

module.exports = {
  ...prodConfig,
  mode: 'development',
  output: {
    path: path.join(process.cwd(), 'docs/dev'),
  },
};
