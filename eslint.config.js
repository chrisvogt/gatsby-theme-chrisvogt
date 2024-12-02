const react = require('eslint-plugin-react')
const jsxA11Y = require('eslint-plugin-jsx-a11y')
const prettier = require('eslint-plugin-prettier')
const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/theme/public/**', '**/www.chrisvogt.me/public/**', '**/.cache/**']
  },
  {
    files: ['theme/**/*.{js,json}', 'www.chrisvogt.me/**/*.{js,json}']
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  {
    plugins: {
      react,
      'jsx-a11y': jsxA11Y,
      prettier
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'none',
          bracketSpacing: true,
          arrowParens: 'avoid',
          jsxSingleQuote: true
        }
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
]
