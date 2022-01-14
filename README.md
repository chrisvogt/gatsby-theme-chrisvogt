# Chris Vogt, My Personal Website

<p align='center'>
  <a href='https://circleci.com/gh/chrisvogt/gatsby-theme-chrisvogt'>
    <img src='https://circleci.com/gh/chrisvogt/gatsby-theme-chrisvogt.svg?style=shield' alt='Current CircleCI build status.' />
  </a>
  <a href='https://codecov.io/gh/chrisvogt/gatsby-theme-chrisvogt'>
    <img src='https://codecov.io/gh/chrisvogt/gatsby-theme-chrisvogt/branch/master/graph/badge.svg' alt='Code coverage report badge.' />
  </a>
  <a href='https://github.com/chrisvogt/gatsby-theme-chrisvogt/blob/master/LICENSE'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='Released under the MIT license.' />
  </a>
  <a href='https://twitter.com/intent/follow?screen_name=c1v0'>
    <img src='https://img.shields.io/twitter/follow/c1v0.svg?label=Follow%20@c1v0' alt='Follow @c1v0' />
  </a>
</p>

This repository contains my personal website and blog, [www.chrisvogt.me](https://www.chrisvogt.me). The front-end code lives within [the theme directory](https://github.com/chrisvogt/gatsby-theme-chrisvogt/tree/master/theme) while the articles live within [the website directory](https://github.com/chrisvogt/gatsby-theme-chrisvogt/tree/master/www.chrisvogt.me).

## Local development

This repository uses [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to separate the theme code from the content.

To install, use Yarn. From the root, do:

```sh
yarn
```

To work on the theme, open the `/theme` directory in an editor and run the following command to preview the website.

```sh
yarn workspace www.chrisvogt.me develop
```

To build the production website, run the following.

```sh
yarn workspace www.chrisvogt.me build
```

The website build will be output to `/www.chrisvogt.me/public`.

## Copyright & License

Copyright © 2019-2022 [Chris Vogt](https://www.chrisvogt.me) - Released under the [MIT license](LICENSE).
