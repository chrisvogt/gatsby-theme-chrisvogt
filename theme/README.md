# chrisvogt.me – a GatsbyJS theme

[![Netlify Status](https://api.netlify.com/api/v1/badges/29f330b8-22bf-4f7f-a0f0-240476512db0/deploy-status)](https://app.netlify.com/sites/chrisvogt/deploys)
[![CI](https://github.com/chrisvogt/gatsby-theme-chrisvogt/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/chrisvogt/gatsby-theme-chrisvogt/actions/workflows/ci.yml)
[![CodeQL](https://github.com/chrisvogt/gatsby-theme-chrisvogt/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/chrisvogt/gatsby-theme-chrisvogt/actions/workflows/codeql-analysis.yml)
[![Code Coverage](https://codecov.io/gh/chrisvogt/gatsby-theme-chrisvogt/branch/main/graph/badge.svg?token=YUksu2c99s)](https://codecov.io/gh/chrisvogt/gatsby-theme-chrisvogt)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/chrisvogt/gatsby-theme-chrisvogt/blob/main/LICENSE)

This directory contains a custom [GatsbyJS](https://www.gatsbyjs.com/) theme used to build my personal website and blog, [www.chrisvogt.me](https://www.chrisvogt.me). The home page of my blog is a social dashboard that showcases recent activity from my accounts. My site content lives in the [../www.chrisvogt.me](../www.chrisvogt.me) workspace.

> **Note:** To use the home page widgets you must provide your own backing service. The theme expects to fetch widget data from individual REST endpoints. Example schemas can be found in the [./**mocks** directory](./__mocks__).

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

## Widgets

Widget code is in the [`./src/components/widgets/`](./src/components/widgets/) directory. The theme includes widgets for:

### Recent Posts

**Recent Posts** renders blog post cards for the latest posts from your Gatsby blog.

### Instagram

**Instagram** renders your total post count and a collection of your recent posts, which open in a [lightGallery](https://www.lightgalleryjs.com/) component.

### GitHub

**GitHub** renders a profile's follower and following counts. It also showcases any pinned items on the profile and the last merged Pull Request.

### Goodreads

**Goodreads** renders an account's friend and book counts. It also renders thumbnails and hyperlinks for recently read books and the latest reading status update.

### Spotify

**Spotify** renders an account's follower and playlist counts. It also showcases public playlists and "Top Tracks" for the account.

### Steam

**Steam** displays gaming activity including owned games, playtime statistics, and recent gaming activity.

### Flickr

**Flickr** shows recent photos from your Flickr account with thumbnails and links to the full images.

## Widget Configuration

Widgets require data sources. Configure them in your `gatsby-config.js`:

```javascript
module.exports = {
  siteMetadata: {
    widgets: {
      github: {
        username: 'your-username',
        widgetDataSource: 'https://your-github-api.com'
      },
      instagram: {
        username: 'your-username',
        widgetDataSource: 'https://your-instagram-api.com'
      },
      spotify: {
        widgetDataSource: 'https://your-spotify-api.com'
      },
      goodreads: {
        username: 'your-username',
        widgetDataSource: 'https://your-goodreads-api.com'
      },
      steam: {
        username: 'your-username',
        widgetDataSource: 'https://your-steam-api.com'
      },
      flickr: {
        username: 'your-username',
        widgetDataSource: 'https://your-flickr-api.com'
      }
    }
  }
}
```

See the [mock data examples](./__mocks__/) for expected API response formats.

## Development

### Available Scripts

| Command              | Description               |
| -------------------- | ------------------------- |
| `yarn test`          | Run test suite            |
| `yarn test:watch`    | Run tests in watch mode   |
| `yarn test:coverage` | Generate coverage report  |
| `yarn format`        | Format code with Prettier |
| `yarn lint`          | Run ESLint                |

### Testing

The theme includes comprehensive testing:

- **Unit Tests**: Jest + React Testing Library
- **Snapshot Tests**: Component regression testing
- **Coverage Reports**: Code coverage tracking

## Copyright & License

Copyright © 2019-2025 [Chris Vogt](https://www.chrisvogt.me). Released under the [MIT license](https://github.com/chrisvogt/gatsby-theme-chrisvogt/tree/master/LICENSE).
