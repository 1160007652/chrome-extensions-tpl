const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-transform-runtime',
  ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          modules: false,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins,
    env: {
      // 开发环境配置
      development: {
        presets: [['@babel/preset-react', { development: true }]],
        plugins: ['react-refresh/babel'],
      },
      // 生产环境配置
      production: {
        presets: ['@babel/preset-react'],
        plugins: [
          'babel-plugin-dev-expression',
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-transform-react-inline-elements',
        ],
      },
    },
  };
};
