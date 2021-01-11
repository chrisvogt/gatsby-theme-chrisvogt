const path = require('path')

module.exports = () => ({
  siteMetadata: {
    avatarURL:
      'https://res.cloudinary.com/chrisvogt/image/upload/v1573025803/avatar_2x_srlojo.png',
    baseURL: 'https://www.privatesphere.io',
    description:
      'A GatsbyJS blog theme with built-in social widgets for Instagram, Goodreads, GitHub, and Spotify.',
    footerText: 'Made in San Francisco',
    headline: 'Private Sphere',
    imageURL: '',
    languageCode: 'en',
    social: {
      twitterUsername: ''
    },
    subhead: 'A Gatsby blog theme with built-in social widgets',
    title: 'Private Sphere',
    titleTemplate: '%s · Private Sphere',
    widgets: {
      github: {
        username: '',
        widgetDataSource: ''
      },
      goodreads: {
        username: '',
        widgetDataSource: ''
      },
      instagram: {
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
      }
    }
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, 'src/pages')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src/data')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `content`,
        name: `content`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-prismjs`,
          `gatsby-remark-images`,
          `gatsby-remark-copy-linked-files`
        ],
        plugins: [
          // FIX(cvogt): this plugin is defined here as a temporary fix for the bug
          // described in gatsbyjs/gatsby#15486
          `gatsby-remark-images`
        ]
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-theme-style-guide',
    'gatsby-transformer-json',
    `gatsby-plugin-theme-ui`
  ]
})
