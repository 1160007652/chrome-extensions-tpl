const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ChromeExtensionLauncher = require('webpack-chrome-extension-launcher');

const base = require('./webpack.config.base');
const config = require('../config');

// base.output.publicPath = `http://${config.dev.ip}:${config.dev.port}/`;
// 由于是 chrome extensions 插件模版,只能使用HashRouter 开发, 所以这里不可以制定全量地址.
base.output.publicPath = '/';

module.exports = merge(base, {
  target: 'web',
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    // 设置cleanStaleWebpackAssets 是为了保证后续热更新时, 不在清空所有数据, 只在第一次运行时清空数据
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // 支持热更新
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    // 运行时,自动打开浏览器扩展
    new ChromeExtensionLauncher(),
  ],
});
