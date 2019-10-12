const path = require('path')

module.exports = options => {
  return {
    siteMetadata: {
      title: 'Gatsby Theme Personal Sphere',
      titleTemplate: '%s · Personal Sphere',
      headline: 'Personal Sphere',
      subhead: 'A Gatsby theme with social widgets',
      description:
        'A gatsby blog theme with built-in recently read and GitHub plugins.',
      baseURL: 'https://www.doe.com', // NOTE(cvogt): no trailing slash
      imageURL: '/images/snape.jpg',
      social: {
        github: {
          username: 'username'
        },
        twitter: {
          username: '@username'
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
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-theme-ui',
      'gatsby-theme-style-guide',
      'gatsby-plugin-emotion',
      'gatsby-transformer-json',
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
      }
    ]
  }
}
