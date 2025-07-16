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
    hCard: {
      email: 'mail@chrisvogt.me',
      givenName: 'Chris',
      familyName: 'Vogt',
      locality: 'San Francisco',
      region: 'CA',
      countryName: 'U.S.A',
      category: 'Software Developer',
      photoURL: 'https://chrisvogt.imgix.net/ig/17948822426064646.jpg'
    },
    imageURL: '/images/og-image.png',
    languageCode: 'en',
    social: {
      twitterUsername: '@c1v0'
    },
    subhead: 'Code, Music & Photography',
    title: 'chrisvogt.me',
    titleTemplate: '%s — Chris Vogt, Software Engineer in San Francisco',
    widgets: {
      flickr: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/flickr'
      },
      github: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/github'
      },
      goodreads: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/goodreads'
      },
      instagram: {
        username: 'chrisvogt',
        widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/instagram'
      },
      spotify: {
        username: 'chrisvogt',
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
      resolve: 'gatsby-theme-chronogrove',
      options: {
        siteMetadata: {
          title: 'chrisvogt.me',
          description: 'Software Engineer in San Francisco blogging about code, photography and piano music.',
          headline: 'Chris Vogt',
          subhead: 'Code, Music & Photography',
          avatarURL: '/images/avatar-256px.jpg',
          imageURL: '/images/og-image.png',
          hCard: {
            email: 'mail@chrisvogt.me',
            givenName: 'Chris',
            familyName: 'Vogt',
            locality: 'San Francisco',
            region: 'CA',
            countryName: 'U.S.A',
            category: 'Software Developer',
            photoURL: 'https://chrisvogt.imgix.net/ig/17948822426064646.jpg'
          },
          social: {
            twitterUsername: '@c1v0'
          },
          footerText: 'Made with ❤️ in San Francisco',
          titleTemplate: '%s — Chris Vogt, Software Engineer in San Francisco'
        },
        navigation: {
          header: {
            left: [
              {
                path: '/about',
                slug: 'about',
                text: 'About',
                title: 'About Me — Chris Vogt'
              },
              {
                path: '/now',
                slug: 'now',
                text: 'Now',
                title: "What I'm up to"
              },
              {
                path: '/blog',
                slug: 'blog',
                text: 'Blog',
                title: 'Latest posts from the blog'
              },
              {
                path: '/music',
                slug: 'music',
                text: 'Music',
                title: 'My music'
              },
              {
                path: '/photography',
                slug: 'photography',
                text: 'Photography',
                title: 'My photo galleries'
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
              },
              {
                path: '#goodreads',
                slug: 'goodreads',
                text: 'Goodreads',
                title: 'Goodreads'
              }
            ]
          }
        },
        widgets: {
          flickr: {
            username: 'chrisvogt',
            widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/flickr'
          },
          github: {
            username: 'chrisvogt',
            widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/github'
          },
          goodreads: {
            username: 'chrisvogt',
            widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/goodreads'
          },
          instagram: {
            username: 'chrisvogt',
            widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/instagram'
          },
          spotify: {
            username: 'chrisvogt',
            widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/spotify'
          },
          steam: {
            username: 'chrisvogt',
            widgetDataSource: 'https://metrics.chrisvogt.me/api/widgets/steam'
          }
        }
      }
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
