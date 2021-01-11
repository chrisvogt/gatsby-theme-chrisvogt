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
        widgetDataSource:
          'http://metrics.dev-chrisvogt.me:5000/api/widgets/github'
      },
      goodreads: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/goodreads'
      },
      instagram: {
        username: 'c1v0',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/instagram'
      },
      spotify: {
        username: 'artinreality',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/spotify'
      },
      steam: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/steam'
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
