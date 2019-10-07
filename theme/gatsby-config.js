const path = require("path")

module.exports = options => {
  return {
    siteMetadata: {
      title: "Gatsby Theme Personal Sphere",
      titleTemplate: "%s · Personal Sphere",
      description: "Hogwarts Potions master, Head of Slytherin house and former Death Eater.",
      url: "https://www.doe.com", // NOTE(cvogt): no trailing slash
      image: "/images/snape.jpg",
      twitterUsername: "@twittername",
    },
    plugins: [
      {
        resolve: "gatsby-plugin-page-creator",
        options: {
          path: path.join(__dirname, "src/pages")
        }
      },
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-theme-ui',
      'gatsby-plugin-emotion',
      'gatsby-transformer-json',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: path.join(__dirname, 'src/data')
        },
      },
    ]
  }
}
