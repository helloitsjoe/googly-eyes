/* eslint-env node */
const path = require('path');
const prodConfig = require('./webpack.config');

module.exports = {
  ...prodConfig,
  output: {
    path: path.join(process.cwd(), 'docs/dev'),
  },
};
