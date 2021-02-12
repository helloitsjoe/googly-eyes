/* eslint-env node */
const path = require('path');
const { makeWebpackConfig } = require('webpack-simple');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = makeWebpackConfig();

config.module = {};

config.devServer = {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
};

config.plugins = [
  new HtmlWebpackPlugin({ template: 'index.template.html', output: 'dist' }),
];

module.exports = config;
