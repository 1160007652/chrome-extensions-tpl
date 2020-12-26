const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('../plugin/webpack-extension-manifest-plugin.js');
const { DefinePlugin } = require('webpack');

const { webpackEntry } = require('../utils/getEntry');
const { PROJECT_ROOT, SRC_ROOT, LESS_PATH_ROOT } = require('../utils/getPath');

const pkgJson = require('../../package.json');

const manifestBase = require('../manifest/manifest.base.json');
const manifestDev = require('../manifest/manifest.dev.json');
const manifestPro = require('../manifest/manifest.pro.json');

const manifest = process.env.NODE_ENV === 'development' ? manifestDev : manifestPro;

const config = require('../config');

module.exports = {
  entry: webpackEntry,
  output: {
    path: path.resolve(PROJECT_ROOT, 'extensions'),
    globalObject: 'this',
    chunkFilename: 'async/js/[name].js',
    filename: 'js/[name].js',
  },
  experiments: {
    // outputModule: true,
    // syncWebAssembly: true, 兼容 旧版 webpack-4
    topLevelAwait: true, // 支持 顶级 await
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              sourceMap: process.env.NODE_ENV === 'development',
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: config.theme,
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(LESS_PATH_ROOT, 'less-var.less')],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: [/\.(woff(2)?|eot|ttf|otf|svg)$/],
        type: 'asset/inline',
      },
      {
        test: [/\.(ico|png|jpe?g|gif)$/],
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'images/[name]-[hash:7][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.wasm'],
    modules: [SRC_ROOT, path.resolve(PROJECT_ROOT, './node_modules')],
    alias: {
      _src: SRC_ROOT,
      _components: path.resolve(SRC_ROOT, './components/'),
      _containers: path.resolve(SRC_ROOT, './containers/'),
      _constants: path.resolve(SRC_ROOT, './constants/'),
      _utils: path.resolve(SRC_ROOT, './utils'),
      _assets: path.resolve(SRC_ROOT, './assets'),
    },
  },
  plugins: [
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin(),
    new AntdDayjsWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: 'public/images/', to: 'images' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: 'public/README.txt', to: './' }] }),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_ROOT, './public/index.html'),
      filename: 'popup.html',
      title: 'Popup Page',
      inject: true,
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_ROOT, './public/index.html'),
      filename: 'options.html',
      title: 'Options Page',
      inject: true,
      chunks: ['options'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'async/css/[name].css',
      ignoreOrder: false,
    }),
    new ManifestPlugin({
      config: {
        base: manifestBase,
        extend: {
          ...manifest,
          version: pkgJson.version,
        },
      },
    }),
    new DefinePlugin({
      'process.env.VERSION_APP': JSON.stringify(pkgJson.version),
    }),
  ],
};
