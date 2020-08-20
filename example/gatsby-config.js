const gatsbyPluginFeedConfig = require('./plugins/gatsby-plugin-feed.config')

module.exports = {
  siteMetadata: {
    description:
      'A GatsbyJS blog theme with built-in social widgets for Instagram, Goodreads, GitHub, and Spotify.',
    footerText: '© 2020 Chris Vogt',
    baseURL: 'https://www.privatesphere.io',
    imageURL: '',
    languageCode: 'en',
    // TODO(chrisvogt): rename this to `widgets`
    social: {
      // github: {
      //   username: 'chrisvogt',
      //   widgetDataSource:
      //     'https://metrics.chrisvogt.me/api/widget-content?widget=github'
      // },
      // goodreads: {
      //   username: 'chrisvogt',
      //   widgetDataSourceBooks: 'https://recently-read.chrisvogt.me',
      //   widgetDataSourceProfile:
      //     'https://metrics.chrisvogt.me/api/widget-content?widget=goodreads'
      // },
      // instagram: {
      //   username: 'c1v0',
      //   widgetDataSource:
      //     'https://metrics.chrisvogt.me/api/widget-content?widget=instagram'
      // },
      spotify: {
        widgetDataSource:
          'https://metrics.chrisvogt.me/api/widget-content?widget=spotify'
      },
      twitter: {
        username: ''
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
