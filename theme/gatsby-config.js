const path = require('path')

module.exports = () => ({
  siteMetadata: {
    avatarURL: 'https://via.placeholder.com/150',
    baseURL: 'https://example.com',
    description:
      'A personal website built with GatsbyJS. Features a social dashboard with widgets for various platforms.',
    footerText: 'Made with ❤️ using gatsby-theme-chronogrove',
    headline: 'My Personal Website',
    hCard: {
      email: 'mail@example.com',
      givenName: 'Given',
      familyName: 'Name',
      locality: 'City',
      region: 'ST',
      countryName: 'Country',
      category: 'Professional Title',
      photoURL: 'https://via.placeholder.com/150'
    },
    imageURL: '',
    languageCode: 'en',
    siteUrl: 'https://example.com',
    social: {
      twitterUsername: ''
    },
    subhead: 'My personal blog and website',
    title: 'My Personal Website',
    titleTemplate: '%s · My Personal Website',
    widgets: {
      flickr: {
        username: '',
        widgetDataSource: ''
      },
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-images',
          'gatsby-remark-embed-video',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers'
        ]
      }
    },
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
        path: 'content',
        name: 'content'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-theme-style-guide',
    'gatsby-transformer-json',
    'gatsby-plugin-theme-ui'
  ]
})
