module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'prettier/prettier': [2, { semi: false, singleQuote: true }],
    semi: [2, 'never'],
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/name-property-casing': 'error',
    'vue/prop-name-casing': 'error',
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',
    'vue/attributes-order': 'error',
    'vue/html-quotes': 'warning',
    'vue/order-in-components': 'warning',
    'vue/component-name-in-template-casing': 'error'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ['plugin:vue/essential', '@vue/prettier']
}
