module.exports = {
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
}
