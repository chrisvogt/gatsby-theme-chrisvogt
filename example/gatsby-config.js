const gatsbyPluginFeedConfig = require('./plugins/gatsby-plugin-feed.config')

module.exports = {
  siteMetadata: {
    description:
      'A GatsbyJS blog theme with built-in social widgets for Instagram, Goodreads, GitHub, and Spotify.',
    footerText: '© 2020 Chris Vogt',
    baseURL: 'https://www.privatesphere.io',
    imageURL: '',
    languageCode: 'en',
    social: {
      github: {
        username: 'chrisvogt'
      },
      goodreads: {
        username: 'chrisvogt'
      },
      github: {
        username: 'instagram'
      },
      twitter: {
        username: 'c1v0'
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
