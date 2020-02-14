# Private Sphere

This is the monorepo for the Gatsby theme used by my personal blog at [www.chrisvogt.me](https://www.chrisvogt.me). This theme only includes the React client. You must provide your own data source to use the social widgets. Examples of the expected data structure can be found in the [/theme/\_\_mocks\_\_](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/theme/__mocks__) directory.

## To install on a blog

Find the theme intall instructions in [the theme's README](https://github.com/chrisvogt/gatsby-theme-private-sphere/tree/master/theme/README.md).

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
