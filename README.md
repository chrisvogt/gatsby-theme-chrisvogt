<img src="https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/hero.png" alt="Theme hero artwork" />

# Private Sphere – a GatsbyJS theme

<p align="center">
  <a href="https://www.npmjs.org/package/gatsby-theme-private-sphere">
    <img src="https://img.shields.io/npm/v/gatsby-theme-private-sphere.svg" alt="Current npm package version." />
  </a>
  <a href="https://circleci.com/gh/chrisvogt/gatsby-theme-private-sphere">
    <img src="https://circleci.com/gh/chrisvogt/gatsby-theme-private-sphere.svg" alt="Current CircleCI build status." />
  </a>
    <a href="https://codecov.io/gh/chrisvogt/gatsby-theme-private-sphere">
    <img src="https://codecov.io/gh/chrisvogt/gatsby-theme-private-sphere/branch/master/graph/badge.svg" alt="Code coverage report badge." />
  </a>
  <a href="https://github.com/chrisvogt/gatsby-theme-private-sphere/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Private Sphere is released under the MIT license." />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=c1v0">
    <img src="https://img.shields.io/twitter/follow/c1v0.svg?label=Follow%20@c1v0" alt="Follow @c1v0" />
  </a>
</p>

Private Sphere is the GatsbyJS theme behind my personal website and blog, [www.chrisvogt.me](https://www.chrisvogt.me). My website exists both to display my aggregate social network activity in a single place and to share original content on my own, original platform.

## Widgets

This theme comes with a collection of Home page widgets that render content from social networks and services.

| Name           | Description                                   | Screenshot                                                                                                                             |
| -------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Blog Posts     | Recent blog articles                          | ![Widget: Blog Posts](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-blog.png)     |
| Instagram Feed | Recent Instagram posts                        | ![Widget: Instagram](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-instagram.jpg) |
| GitHub         | Recent activity, pinned repositories, metrics | ![Widget: GitHub](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-github.png)       |
| Goodreads      | Recently read books, recent activity, metrics | ![Widget: Goodreads](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-goodreads.png) |
| Spotify        | Top tracks, metrics                           | ![Widget: Spotify](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-private-sphere/master/theme/assets/widget-spotify.png)     |

> NOTE: Private Sphere only includes the client. You will need to supply your own REST endpoints for widgets to fetch data from. The expected response structure can be found in the [/theme/\_\_mocks\_\_](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/theme/__mocks__) directory.

## To install on a blog

Find the theme install instructions in [the theme's README](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/theme/README.md).

## To develop the theme

This repository is a [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) containing the theme and an example website.

To install, use Yarn. From the root, do:

```sh
yarn
```

To work on the theme, open the `/theme` directory in an editor and run the following command to preview the example website.

```sh
yarn workspace example develop
```

To build the example website, run the following.

```sh
yarn workspace example build
```

The example site build will be output to `/example/public`.

## Copyright & License

Copyright © 2019-2020 [Chris Vogt](https://www.chrisvogt.me) - Released under the [MIT license](LICENSE).
