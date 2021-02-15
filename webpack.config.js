/* eslint-env node */
const path = require('path');
const ip = require('ip');
const { makeWebpackConfig } = require('webpack-simple');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = makeWebpackConfig();

config.output = {
  path: path.join(process.cwd(), 'docs'),
};
config.module = {};

config.devServer = {
  contentBase: path.join(__dirname, 'docs'),
  compress: true,
  https: true,
  // host: '0.0.0.0',
  port: 9000,
};

config.plugins = [
  new HtmlWebpackPlugin({ template: 'index.template.html', output: 'docs' }),
];

console.log(`Running on ${ip.address()}:9000`);
module.exports = config;
