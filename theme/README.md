# gatsby-theme-private-sphere

The Gatsby blog theme used on my personal website, at [www.chrisvogt.me](https://www.chrisvogt.me). This theme is built to be both a window into my online activity and a publishing tool for me to share a range of written and digital content.

It is possible to customize and reuse this theme, but you will need to bring your own data. Examples of the expected data structure are available in the [**mocks**](__mocks__) directory, and your data must be available via URL.

## Installation

```
yarn add gatsby gatsby-theme-private-sphere react react-dom
```

## Usage

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    /* your site settings */
  },
  plugins: [
    {
      resolve: 'gatsby-theme-private-sphere',
      options: {
        /* your custom options */
      }
    }
  ]
}
```

Review the [example config](/example/gatsby-config.js) for the available site metadata fields.

## Copyright & License

Copyright (c) 2019 [Chris Vogt](https://www.chrisvogt.me) - Released under the [MIT license](LICENSE).
