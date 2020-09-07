const gatsbyPluginFeedConfig = require('./plugins/gatsby-plugin-feed.config')

module.exports = {
  siteMetadata: {
    baseURL: 'https://www.privatesphere.io',
    description:
      'A GatsbyJS blog theme with built-in social widgets for Instagram, Goodreads, GitHub, and Spotify.',
    footerText: '© Chris Vogt',
    imageURL: '',
    languageCode: 'en',
    social: {
      twitterUsername: '@c1v0'
    },
    widgets: {
      github: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/github'
      },
      goodreads: {
        username: 'chrisvogt',
        widgetDataSourceBooks: 'https://recently-read.chrisvogt.me',
        widgetDataSourceProfile:
          'https://metrics.chrisvogt.me/api/widgets/goodreads'
      },
      instagram: {
        username: 'c1v0',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/instagram'
      },
      profiles: {
        widgetDataSourceMetas: 'https://api.chrisvogt.me/metas',
        widgetDataSourceProfiles: 'https://api.chrisvogt.me/profiles'
      },
      spotify: {
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/spotify'
      }
    }
  },
  plugins: [
    {
      resolve: 'gatsby-theme-private-sphere',
      options: {}
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2'
    },
    gatsbyPluginFeedConfig
  ]
}
