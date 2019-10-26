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
                slug
                id
              }
              frontmatter {
                title
                description
                banner
                categories
                date
                slug
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
