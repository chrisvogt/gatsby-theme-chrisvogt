const path = require('path')

module.exports = {
  siteMetadata: {
    avatarURL: 'https://via.placeholder.com/150',
    baseURL: 'https://www.chronogrove.com',
    description:
      'Official demo site for gatsby-theme-chronogrove - A beautiful Gatsby theme for personal websites and blogs',
    footerText: 'Made with ❤️ using gatsby-theme-chronogrove',
    headline: 'Chronogrove',
    hCard: {
      email: 'hello@chronogrove.com',
      givenName: 'Chronogrove',
      locality: 'San Francisco',
      region: 'CA',
      countryName: 'USA',
      category: 'Gatsby Theme',
      photoURL: 'https://via.placeholder.com/150'
    },
    imageURL: '',
    languageCode: 'en',
    siteUrl: 'https://www.chronogrove.com',
    social: {
      twitterUsername: 'chronogrove'
    },
    subhead: 'Official demo site for gatsby-theme-chronogrove',
    title: 'Chronogrove',
    titleTemplate: '%s · A GatsbyJS Theme for Personal Websites',
    widgets: {
      flickr: {
        username: 'chronogrove',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/flickr/chronogrove'
      },
      github: {
        username: 'chronogrove',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/github/chronogrove'
      },
      goodreads: {
        username: 'chronogrove',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/goodreads/chronogrove'
      },
      instagram: {
        username: 'chronogrove',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/instagram/chronogrove'
      },
      spotify: {
        username: 'chronogrove',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/spotify/chronogrove'
      },
      steam: {
        username: 'chronogrove',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/steam/chronogrove'
      }
    }
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chronogrove',
      options: {
        // Theme options can go here
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'content'),
        name: 'content'
      }
    }
  ]
}
