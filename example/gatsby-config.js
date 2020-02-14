const gatsbyPluginFeedConfig = require('./plugins/gatsby-plugin-feed.config')

module.exports = {
  siteMetadata: {
    description:
      'A gatsby blog theme with built-in recently read and GitHub plugins.',
    footerText: '© 2020 Chris Vogt',
    baseURL: 'http://127.0.0.1:8080',
    imageURL: '',
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
    gatsbyPluginFeedConfig
  ]
}
