const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    // 专门支持了 eslint-plugin-react
    'prettier/react',
    // 专门支持了 @typescript-eslint/eslint-plugin
    // 'prettier/@typescript-eslint',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/button-has-type': 'never',
    'react/prop-types': 'never',
    'react/sort-comp': 'never',
    'import/extensions': 'never',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    //  取消 .d.ts 声明文件中使用了 constructor 报错 问题
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.less', '.jsx', '.json', '.jsonc', '.wasm'],
      },
      alias: {
        map: [
          ['_src', path.resolve(__dirname, './src/')],
          ['_components', path.resolve(__dirname, './src/components/')],
          ['_containers', path.resolve(__dirname, './src/containers/')],
        ],
        extensions: ['.js', '.less', '.jsx', '.json', '.jsonc', '.wasm'],
      },
    },
  },
};
