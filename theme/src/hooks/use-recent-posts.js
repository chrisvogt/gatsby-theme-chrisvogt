import { useStaticQuery, graphql } from 'gatsby'

export const getPosts = queryResult => {
  const { allMdx: { edges = [] } = {} } = queryResult
  const recentPosts = edges.map(({ node }) => node)
  return recentPosts
}

const useRecentPosts = () => {
  const queryResult = useStaticQuery(
    graphql`
      query RecentPosts {
        allMdx(limit: 2) {
          edges {
            node {
              excerpt(pruneLength: 255)
              fields {
                category
                id
                slug
              }
              frontmatter {
                banner
                categories
                date(formatString: "MMMM DD, YYYY")
                description
                slug
                title
              }
            }
          }
        }
      }
    `
  )

  const recentPosts = getPosts(queryResult)
  return recentPosts
}

export default useRecentPosts
