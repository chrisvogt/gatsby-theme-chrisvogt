const gatsbyPluginFeedConfig = require('./plugins/gatsby-plugin-feed.config')

require('dotenv').config({
  path: `../.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    avatarURL: '/images/avatar-256px.jpg',
    baseURL: 'https://www.chrisvogt.me',
    siteUrl: 'https://www.chrisvogt.me',
    description: 'Software Engineer in San Francisco blogging about code, photography and piano music.',
    headline: 'Chris Vogt',
    imageURL: '/images/og-image.png',
    languageCode: 'en',
    social: {
      twitterUsername: '@c1v0'
    },
    subhead: 'Code, Music & Photography',
    title: 'chrisvogt.me',
    titleTemplate: '%s — Chris Vogt, Software Engineer in San Francisco',
    widgets: {
      github: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/github'
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
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/spotify'
      }
    }
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chrisvogt',
      options: {}
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_PROPERTY_ID,
        head: false,
        respectDNT: true
      }
    },
    gatsbyPluginFeedConfig,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {}
    }
  ]
}
