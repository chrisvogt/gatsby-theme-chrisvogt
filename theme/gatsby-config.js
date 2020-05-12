const path = require('path')

module.exports = () => ({
  siteMetadata: {
    /** URL for the site avatar. Rendered into the home page header. */
    avatarURL:
      'https://res.cloudinary.com/chrisvogt/image/upload/v1573025803/avatar_2x_srlojo.png',
    /** The absolute base URL for the site. Used in the RSS feed. */
    baseURL: 'https://privatesphere.io',
    /** The title of the page. */
    title: 'Private Sphere',
    /** A title template string. Passed to React Helmet. */
    titleTemplate: '%s · Private Sphere',
    /** The site headline. Rendered into the home page header. */
    headline: 'Private Sphere',
    /** The site subhead. Rendered into the home page header. */
    subhead: 'A Gatsby blog theme with built-in social widgets',
    /** The site description. Used as the default meta description value. */
    description:
      'A GatsbyJS blog theme with built-in social widgets for Instagram, Goodreads, GitHub, and Spotify.',
    /** Site text rendered into the footer copyright region. */
    footerText: 'Made in San Francisco',
    /** The site language code (i.e., 'en', 'es', 'fr', 'de'). Set as an attribute on the html element. */
    languageCode: 'en',
    /** The default site Open Graph banner image. */
    imageURL: '',
    /** Contains all social properties. Used to build profile links in the widgets. */
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
            family: `Open Sans`,
            variants: [`400`, `700`]
          },
          {
            family: `PT Serif`,
            variants: [`400`, `400i`, `700`]
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
