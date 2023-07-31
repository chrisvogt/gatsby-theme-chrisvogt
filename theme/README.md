# chrisvogt.me – a GatsbyJS theme

[![Build Status](https://badges.netlify.com/api/chrisvogt.svg?branch=master)](https://app.netlify.com/sites/chrisvogt/deploys)

This directory contains a custom [GatsbyJS](https://www.gatsbyjs.com/) theme used to build my personal website and blog, [www.chrisvogt.me](https://www.chrisvogt.me). The home page of my blog is a social dashboard that showcases recent activity from my accounts. My site content lives in the [../www.chrisvogt.me](../www.chrisvogt.me) workspace.

> **Note:** To use the home page widgets you must provide your own backing service. The theme expects to fetch widget data from individual REST endpoints. Example schemas can be found [the ./\_\_mocks\_\_ directory](https://github.com/chrisvogt/gatsby-theme-chrisvogt/tree/master/theme/__mocks__).

## Installation

This repository is a monorepo that uses [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) to manage projects. Run `yarn` in the root directory to install dependencies for both workspaces.

## Configuration

The `gatsby-config.js` file in this workspace contains default and placeholder settings for theme options.

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    /* site settings – see /www.chrisvogt.me */
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chrisvogt',
      options: {
        /* custom theme options – see /www.chrisvogt.me */
      }
    }
  ]
}
```

Review the [website site configuration](https://github.com/chrisvogt/gatsby-theme-chrisvogt/tree/master/www.chrisvogt.me/gatsby-config.js) for an example of available site metadata fields.

#### Widgets

Widget code is in the [`./src/components/widgets/`](./src/components/widgets/) directory. I've currently built widgets for recent blog posts, GitHub, Goodreads, Instagram and Spotify.

###### Recent Posts

**Recent Posts** renders blog post cards for the latest 2 posts.

![Screenshot: Blog](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-chrisvogt/master/theme/assets/widget-blog.png)

###### Instagram

**Instagram** renders your total post count and the last 8 photos posted. It also uses [`react-images`](https://www.npmjs.com/package/react-images) to provide a fullscreen carousel when photo thumbnails are interacted with.

![Screenshot: Instagram](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-chrisvogt/master/theme/assets/widget-instagram.jpg)

###### GitHub

**GitHub** renders a profile's follower and following counts. It also showcases any pinned items on the profile and the last merged Pull Request.

![Screenshot: GitHub](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-chrisvogt/master/theme/assets/widget-github.png)

###### Goodreads

**Goodreads** renders an account's friend and book counts. It also renders thumbnails and hyperlinks for the last 12 book read and the latest reading status update.

![Screenshot: Goodreads](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-chrisvogt/master/theme/assets/widget-goodreads.png)

###### Spotify

**Spotify** renders an account's follower and playlist counts. It also showcases the first 12 public playlists in the account, in the order set by dragging playlists in the Spotify UI, along with the 12 "Top Tracks" for the account.

![Screenshot: Spotify](https://raw.githubusercontent.com/chrisvogt/gatsby-theme-chrisvogt/master/theme/assets/widget-spotify.png)

## Copyright & License

Copyright © 2019-2023 [Chris Vogt](https://www.chrisvogt.me). Released under the [MIT license](https://github.com/chrisvogt/gatsby-theme-chrisvogt/tree/master/LICENSE).
