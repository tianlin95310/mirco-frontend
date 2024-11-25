module.exports = {
  root: true,
  env: {
    node: true,
    'es2020': true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 参数名前空格的问题
    'space-before-function-paren': ['off', 'never'],
    // 多余的空格问题
    'no-trailing-spaces': ['off'],
    // 未使用的字段
    'no-unused-vars': ['off'],
    // 空格
    "vue/script-indent": ["off", 2, {
      "baseIndent": 0,
      "switchCase": 0,
      "ignores": []
    }],
    "vue/multi-word-component-names": ['off']
  }
}
