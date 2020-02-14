module.exports = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
      {
        site {
          siteMetadata {
            baseURL
            description
            title
          }
        }
      }
    `,
    feeds: [
      {
        serialize: ({ query: { site, allMdx } }) => {
          return allMdx.edges.map(edge => {
            const hasImage = Boolean(edge.node.frontmatter.banner)
            return Object.assign({}, edge.node.frontmatter, {
              category: edge.node.fields.category,
              date: edge.node.frontmatter.date,
              description: edge.node.excerpt,
              feed_url: site.siteMetadata.baseUrl + '/rss.xml',
              guid: site.siteMetadata.baseURL + edge.node.fields.slug,
              ...(hasImage ? { image: edge.node.frontmatter.banner } : {}),
              url: site.siteMetadata.baseURL + edge.node.fields.slug
            })
          })
        },
        query: `
          {
            allMdx(
              sort: { order: DESC, fields: [frontmatter___date] },
            ) {
              edges {
                node {
                  excerpt
                  fields {
                    category
                    slug
                  }
                  frontmatter {
                    banner
                    date
                    title
                  }
                }
              }
            }
          }
        `,
        output: '/rss.xml',
        title: 'Gatsby Theme Private Sphere RSS Feed'
      }
    ]
  }
}
