const gatsbyPluginFeedConfig = require('./plugins/gatsby-plugin-feed.config')

module.exports = {
  siteMetadata: {
    avatarURL: "/images/avatar-256px.jpg",
    baseURL: "https://www.chrisvogt.me",
    description: `
    Software Engineer in San Francisco, sharing code, photography, and original music.
    `,
    footerText: "© 2022 Chris Vogt",
    headline: "Chris Vogt",
    imageURL: "/images/og-image.png",
    languageCode: "en",
    social: {
      twitterUsername: "@c1v0",
    },
    subhead: "Code, Music & Photography",
    title: "CHRISVOGT.me",
    titleTemplate: "%s — Chris Vogt, Software Engineer in San Francisco",
    widgets: {
      github: {
        username: "chrisvogt",
        widgetDataSource: "https://metrics.chrisvogt.me/api/widgets/github",
      },
      goodreads: {
        username: "chrisvogt",
        widgetDataSource: "https://metrics.chrisvogt.me/api/widgets/goodreads",
      },
      instagram: {
        username: "c1v0",
        widgetDataSource: "https://metrics.chrisvogt.me/api/widgets/instagram",
      },
      spotify: {
        widgetDataSource: "https://metrics.chrisvogt.me/api/widgets/spotify",
      },
    },
  },
  plugins: [
    {
      resolve: "gatsby-theme-private-sphere",
      options: {},
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId:
          process.env.NODE_ENV === "production"
            ? "UA-33558417-1"
            : "UA-33558417-14",
        head: false,
        respectDNT: true,
      },
    },
    gatsbyPluginFeedConfig
  ],
};
