/**
 * Default theme configuration
 * This can be overridden by theme options in gatsby-config.js
 */

const merge = require('lodash.merge')

const defaultConfig = {
  // Core site metadata
  siteMetadata: {
    title: 'My Personal Website',
    description: 'A personal website and blog',
    siteUrl: 'https://example.com',
    baseURL: 'https://example.com',
    languageCode: 'en',

    // Personal information
    headline: 'My Website',
    subhead: 'Personal blog and portfolio',
    avatarURL: '',
    imageURL: '',

    // Contact information
    hCard: {
      email: 'mail@example.com',
      givenName: 'Given',
      familyName: 'Name',
      locality: 'City',
      region: 'ST',
      countryName: 'Country',
      category: 'Professional Title',
      photoURL: ''
    },

    // Social media
    social: {
      twitterUsername: ''
    },

    // Footer
    footerText: 'Made with ❤️',

    // SEO
    titleTemplate: '%s · My Website'
  },

  // Navigation configuration
  navigation: {
    header: {
      left: [
        {
          path: '/about',
          slug: 'about',
          text: 'About',
          title: 'About Me'
        },
        {
          path: '/blog',
          slug: 'blog',
          text: 'Blog',
          title: 'Latest posts from the blog'
        }
      ],
      home: [
        {
          path: '#github',
          slug: 'github',
          text: 'GitHub',
          title: 'GitHub'
        },
        {
          path: '#instagram',
          slug: 'instagram',
          text: 'Instagram',
          title: 'Instagram'
        }
      ]
    }
  },

  // Widget configuration
  widgets: {
    github: {
      username: '',
      widgetDataSource: ''
    },
    instagram: {
      username: '',
      widgetDataSource: ''
    },
    goodreads: {
      username: '',
      widgetDataSource: ''
    },
    spotify: {
      username: '',
      widgetDataSource: ''
    },
    steam: {
      username: '',
      widgetDataSource: ''
    },
    flickr: {
      username: '',
      widgetDataSource: ''
    }
  }
}

/**
 * Merge theme options with defaults
 * @param {Object} themeOptions - Options passed from gatsby-config.js
 * @returns {Object} Merged configuration
 */
const mergeConfig = (themeOptions = {}) => {
  // lodash.merge mutates the first argument, so use an empty object as the base
  return merge({}, defaultConfig, themeOptions)
}

module.exports = {
  defaultConfig,
  mergeConfig
}
