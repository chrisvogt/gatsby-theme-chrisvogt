<img src="https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/hero.png" alt="Theme hero artwork" />

# Private Sphere – a GatsbyJS theme

Private Sphere is the GatsbyJS theme behind my personal website and blog, [www.chrisvogt.me](https://www.chrisvogt.me). My website exists both to display my aggregate social network activity in a single place and to share original content on my own, original platform.

> **Warning:** This theme is a personal hobby project. This project is unstable and not ready for use on a live site unless you are feeling adventurous.

> **Note:** To use the home page widgets, you must currently build and serve your own data service, and expose that data over REST endpoints. The expected schema for each widget is saved in the [/theme/\_\_mocks\_\_](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/theme/__mocks__) directory.

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
      },
    },
  ],
}
```

Review the [example site configuration](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/example/gatsby-config.js) for an example of available site metadata fields.

## Screenshots

#### Widgets

###### Blog

![Screenshot: Blog](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-blog.png)

###### Instagram

![Screenshot: Instagram](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-instagram.jpg)

###### GitHub

![Screenshot: GitHub](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-github.png)

###### Goodreads

![Screenshot: Goodreads](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-goodreads.png)

###### Spotify

![Screenshot: Spotify](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-spotify.png)

## Copyright & License

Copyright © 2019-2022 [Chris Vogt](https://www.chrisvogt.me) - Released under the [MIT license](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/LICENSE).
