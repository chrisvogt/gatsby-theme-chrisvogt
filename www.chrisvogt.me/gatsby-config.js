const gatsbyPluginFeedConfig = require('./plugins/gatsby-plugin-feed.config')

require('dotenv').config({
  path: `../.env.${process.env.NODE_ENV}`
})

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.chrisvogt.me',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env

const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    avatarURL: '/images/avatar-256px.jpg',
    baseURL: 'https://www.chrisvogt.me',
    siteUrl,
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
      },
      steam: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/steam'
      }
    }
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chrisvogt',
      options: {}
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_PROPERTY_ID,
        head: false,
        respectDNT: true
      }
    },
    gatsbyPluginFeedConfig,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*', allow: ['/'] }],
            sitemap: `${siteUrl}/sitemap-index.xml`
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {}
    },
    {
      resolve: 'gatsby-plugin-newrelic',
      options: {
        config: {
          accountId: process.env.NEW_RELIC_ACCOUNT_ID,
          agentID: process.env.NEW_RELIC_AGENT_ID,
          applicationID: process.env.NEW_RELIC_APPLICATION_ID,
          beacon: 'bam.nr-data.net',
          errorBeacon: 'bam.nr-data.net',
          instrumentationType: 'proAndSPA',
          licenseKey: process.env.NEW_RELIC_LICENSE_KEY,
          settings: {
            distributed_tracing: {
              enabled: true
            },
            privacy: {
              cookies_enabled: true
            },
            ajax: {
              deny_list: ['bam-cell.nr-data.net']
            }
          },
          trustKey: process.env.NEW_RELIC_TRUST_KEY
        }
      }
    }
  ]
}
