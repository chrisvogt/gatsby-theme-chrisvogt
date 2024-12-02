const react = require('eslint-plugin-react')
const jsxA11Y = require('eslint-plugin-jsx-a11y')
const prettier = require('eslint-plugin-prettier')
const js = require('@eslint/js')

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/theme/public/**',
      '**/www.chrisvogt.me/public/**',
      '**/.cache/**'
    ]
  },
  {
    files: ['theme/**/*.{js,json}', 'www.chrisvogt.me/**/*.{js,json}']
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
      'react/prop-types': 'off'
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
  },
  // {
  //   files: ['theme/**/*.{js,json}', 'www.chrisvogt.me/**/*.{js,json}'],
  //   ignores: [
  //     '**/node_modules/**',
  //     '**/theme/public/**',
  //     '**/www.chrisvogt.me/public/**',
  //     '**/www.chrisvogt.me/.cache/**',
  //     '**/.cache/**'
  //   ]
  // }
]
