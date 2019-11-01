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
              fields {
                id
                slug
              }
              frontmatter {
                banner
                categories
                date
                description
                slug
                title
              }
              excerpt(pruneLength: 255)
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
