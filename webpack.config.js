/* eslint-env node */
const path = require('path');
const ip = require('ip');
const { makeWebpackConfig } = require('webpack-simple');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = makeWebpackConfig({
  // mode: 'production',
  output: {
    path: path.join(process.cwd(), 'docs'),
  },
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    hot: true,
    compress: true,
    https: true,
    host: '0.0.0.0',
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.template.html', output: 'docs' }),
  ],
});

// Override module so we don't need babel
config.module = {};

console.log(`Running on ${ip.address()}:9000`);
module.exports = config;
