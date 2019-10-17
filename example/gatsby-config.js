module.exports = {
  siteMetadata: {
    title: 'CHRISVOGT.me',
    titleTemplate: '%s · Personal Sphere',
    headline: 'Chris Vogt',
    subhead: 'Software Engineer in San Francisco',
    description:
      'A gatsby blog theme with built-in recently read and GitHub plugins.',
    baseURL: '', // NOTE(cvogt): no trailing slash
    imageURL: '/images/snape.jpg',
    social: {
      github: {
        username: 'chrisvogt'
      },
      goodreads: {
        username: 'chrisvogt'
      },
      github: {
        username: 'instagram'
      },
      twitter: {
        username: 'c1v0'
      }
    }
  },
  plugins: [
    {
      resolve: 'gatsby-theme-personal-sphere',
      options: {}
    }
  ]
}
