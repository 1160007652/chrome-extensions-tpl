/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 11:46:25
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-15 11:55:46
 * @ Description: webpack 打包入口配置文件
 */

const fs = require('fs');
const path = require('path');
const { SRC_ROOT, HMR_CLIENT_SCRIPT } = require('./getPath');

const devEntry = {
  background: [HMR_CLIENT_SCRIPT, path.resolve(SRC_ROOT, 'app/Background/index.ts')],
  options: [HMR_CLIENT_SCRIPT, path.resolve(SRC_ROOT, 'app/Options/index.tsx')],
  popup: [HMR_CLIENT_SCRIPT, path.resolve(SRC_ROOT, 'app/Popup/index.tsx')],
};

const proEntry = {
  background: path.resolve(SRC_ROOT, 'app/Background/index.ts'),
  options: path.resolve(SRC_ROOT, 'app/Options/index.tsx'),
  popup: path.resolve(SRC_ROOT, 'app/Popup/index.tsx'),
};

const webpackEntry = process.env.NODE_ENV === 'development' ? devEntry : proEntry;

/**
 * 开始 - 遍历 src/app/Contents 目录下的 模块
 * */

const scriptNames = fs.readdirSync(path.resolve(SRC_ROOT, './app/Contents'));

scriptNames.forEach((name) => {
  const contentModulePath = path.resolve(SRC_ROOT, `./app/Contents/${name}/index.ts`);

  // webpack 入口模块， 以及最后生成的文件，都是使用这个名称， 将首字母转为小写
  const webpackEntryContentName = name.replace(name[0], name[0].toLowerCase());

  if (fs.existsSync(contentModulePath)) {
    webpackEntry[webpackEntryContentName] = [contentModulePath];

    // 只在 开会环境下， 注入热更新文件
    if (process.env.NODE_ENV === 'development') {
      webpackEntry[webpackEntryContentName].unshift(path.resolve(__dirname, './autoRefreshClient.js'));
    }
  }
});

/**
 * 结束 - content 模块扫描
 */

// 开发环境, contents 存在 注入模块，才向 background 注入 content 热更新资源
if (scriptNames.length > 0 && process.env.NODE_ENV === 'development') {
  webpackEntry.background.unshift(path.resolve(__dirname, './autoReloadClient.js'));
}

module.exports = {
  webpackEntry,
};
