const path = require('path')

module.exports = options => {
  return {
    siteMetadata: {
      title: 'Gatsby Theme Personal Sphere',
      titleTemplate: '%s · Personal Sphere',
      headline: 'Personal Sphere',
      subhead: 'A Gatsby theme with built-in social widgets',
      description:
        'A gatsby blog theme with built-in recently read and GitHub plugins.',
      baseURL: '', // NOTE(cvogt): no trailing slash
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
        resolve: `gatsby-transformer-sharp`
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `content`,
          name: `content`
        }
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1200
              }
            },
            {
              resolve: `gatsby-remark-autolink-headers`,
              options: {
                icon: false
              }
            },
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                // showLineNumbers: true
              }
            },
            {
              resolve: `gatsby-remark-copy-linked-files`
              // options: {
              //   ignoreFileExtensions: [`png`, `jpg`, `jpeg`],
              // },
            },
            `gatsby-remark-embed-video`
          ]
        }
      },
      'gatsby-plugin-emotion',
      'gatsby-plugin-react-helmet',
      'gatsby-theme-style-guide',
      'gatsby-transformer-json',
      `gatsby-plugin-sharp`,
      `gatsby-plugin-theme-ui`
    ]
  }
}
