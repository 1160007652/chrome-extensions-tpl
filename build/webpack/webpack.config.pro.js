const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const base = require('./webpack.config.base');

base.output.publicPath = '/';

module.exports = merge(base, {
  mode: 'production',
  externals: {},
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false }), new OptimizeCSSAssetsPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
});
