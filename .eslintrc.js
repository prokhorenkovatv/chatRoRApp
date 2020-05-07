module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  root: true,
  rules: {
    'react/prefer-stateless-function': 'warn',
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: false,
      },
    ],
    'react/sort-comp': [
      1,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'rendering'],
        groups: {
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/require-default-props': 0,
    'jsx-a11y/href-no-hash': 'off',
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/jsx-handler-names': [
      'warn',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-key': 'error',
    'react/jsx-wrap-multilines': [
      'warn',
      {
        declaration: 'parens',
        assignment: 'parens-new-line',
        return: 'parens',
        arrow: 'parens',
      },
    ],
    'react/jsx-indent-props': [1, 2],
    'no-trailing-spaces': [2, {skipBlankLines: true}],
    'prefer-template': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'babel/object-curly-spacing': 0,
    semi: 0,
    'no-tabs': 1,
    'no-undef': 2,
    'no-console': 2,
    'max-len': [
      1,
      {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
      },
    ],
    // "no-restricted-modules": [
    //   "error",
    //   {
    //     "patterns": ["../*"]
    //   }
    // ],
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 1,
    'react/no-direct-mutation-state': 2,
    'react/jsx-uses-vars': 2,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-no-duplicate-props': 2,
    'react/no-unused-vars': 'off',
    'no-use-before-define': [
      'error',
      {functions: false, classes: true, variables: false},
    ],
    'react/jsx-closing-bracket-location': [enabled, 'tag-aligned'],
  },
  globals: {
    React: 'readonly',
    document: 'readonly',
    window: 'readonly',
    console: 'readonly',
    setTimeout: 'readonly',
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
};
