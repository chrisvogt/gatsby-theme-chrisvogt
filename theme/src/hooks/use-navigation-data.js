import { useStaticQuery, graphql } from 'gatsby'

const useNavigationData = () => {
  const { site: { siteMetadata: { navigation } = {} } = {} } = useStaticQuery(graphql`
    query NavigationData {
      site {
        siteMetadata {
          navigation {
            header {
              home {
                path
                slug
                text
                title
              }
              left {
                path
                slug
                text
                title
              }
            }
          }
        }
      }
    }
  `)

  // Defensive: always return arrays for header.left and header.home
  const result = {
    header: {
      left: navigation?.header?.left || [],
      home: navigation?.header?.home || []
    }
  }
  console.log('useNavigationData result:', result)
  return result
}

export default useNavigationData
