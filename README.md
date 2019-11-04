# gatsby-theme-personal-sphere

The Gatsby theme used on my personal website, located at [www.chrisvogt.me](https://www.chrisvogt.me). I'm building this theme to be both a window into my digital activity and a publishing tool for me to share a range of written and digital content.

## Installation

```
yarn add gatsby gatsby-theme-personal-sphere react react-dom
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
      resolve: 'gatsby-theme-personal-sphere',
      options: {
        /* your custom options */
      }
    }
  ]
}
```

See the [example config](/example/gatsby-config.js) to see the available site metadata fields.

## Copyright & License

Copyright (c) 2019 [Chris Vogt](https://www.chrisvogt.me) - Released under the [MIT license](LICENSE).
