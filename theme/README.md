# Gatsby Theme Private Sphere

This is the Gatsby theme used on my personal website and blog, at [www.chrisvogt.me](https://www.chrisvogt.me). This package only includes the React client. You must provide your own data source to use the social widgets. Examples of the expected data structure can be found in the [/theme/\_\_mocks\_\_](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/theme/__mocks__) directory.

## Installation

```
yarn add gatsby gatsby-theme-private-sphere react react-dom
```

## Usage

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    /* site settings – see /example */
  },
  plugins: [
    {
      resolve: 'gatsby-theme-private-sphere',
      options: {
        /* custom theme options – see /example */
      }
    }
  ]
}
```

Review the [example site configuration](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/example/gatsby-config.js) for an example of available site metadata fields.

## Copyright & License

Copyright © 2019-2020 [Chris Vogt](https://www.chrisvogt.me) - Released under the [MIT license](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/LICENSE).
