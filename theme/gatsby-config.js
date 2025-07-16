const path = require('path')
const { mergeConfig } = require('./src/data/theme-config')

module.exports = (themeOptions = {}) => {
  const config = mergeConfig(themeOptions)

  return {
    siteMetadata: {
      ...config.siteMetadata,
      navigation: config.navigation,
      widgets: config.widgets
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
  }
}
