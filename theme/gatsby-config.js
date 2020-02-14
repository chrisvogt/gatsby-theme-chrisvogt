const path = require('path')

const gatsbyPluginFeedConfig = require('./plugins/gatsby-plugin-feed.config')
const gatsbyPluginMdx = require('./plugins/gatsby-plugin-mdx.config')

module.exports = options => {
  return {
    siteMetadata: {
      avatarURL:
        'https://res.cloudinary.com/chrisvogt/image/upload/v1573025803/avatar_2x_srlojo.png',
      title: 'Private Sphere',
      titleTemplate: '%s · Private Sphere',
      headline: 'Private Sphere',
      subhead: 'A Gatsby blog theme with built-in social widgets',
      description:
        'Private Sphere is a Gatsby blog theme with built-in Goodreads and GitHub widgets.',
      footerText: 'Made in San Francisco',
      baseURL: 'https://www.privatesphere.io',
      imageURL: '',
      social: {
        github: {
          username: 'chrisvogt'
        },
        goodreads: {
          username: 'chrisvogt'
        },
        instagram: {
          username: 'c1v0'
        },
        twitter: {
          username: '@c1v0'
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
        resolve: `gatsby-plugin-prefetch-google-fonts`,
        options: {
          fonts: [
            {
              family: `Domine`,
              variants: [`400`, `700`]
            }
          ]
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
      gatsbyPluginFeedConfig,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      gatsbyPluginMdx,
      'gatsby-plugin-emotion',
      'gatsby-plugin-react-helmet',
      'gatsby-theme-style-guide',
      'gatsby-transformer-json',
      `gatsby-plugin-theme-ui`
    ]
  }
}
