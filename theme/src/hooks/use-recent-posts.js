import { useStaticQuery, graphql } from 'gatsby'

export const getPosts = (queryResult, limit = null) => {
  const { allMdx: { edges = [] } = {} } = queryResult
  const recentPosts = edges.map(({ node }) => node).filter(node => node.frontmatter.slug !== 'now')
  return limit ? recentPosts.slice(0, limit) : recentPosts
}

const useRecentPosts = (limit = null) => {
  const queryResult = useStaticQuery(graphql`
    query RecentPosts {
      allMdx(limit: 3, sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            excerpt(pruneLength: 255)
            fields {
              category
              id
              slug
              path
            }
            frontmatter {
              banner
              date(formatString: "MMMM DD, YYYY")
              description
              slug
              title
            }
          }
        }
      }
    }
  `)

  const recentPosts = getPosts(queryResult, limit)
  return recentPosts
}

export default useRecentPosts
