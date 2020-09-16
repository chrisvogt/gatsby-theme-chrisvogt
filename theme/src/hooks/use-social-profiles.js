import { useStaticQuery, graphql } from 'gatsby'

const useSocialProfiles = () => {
  const { allSocialProfilesJson: { edges = [] } = {} } = useStaticQuery(graphql`
    query AllSocialProfiles {
      allSocialProfilesJson {
        edges {
          node {
            displayName
            href
            icon {
              class
              name
              reactIcon
              set
            }
            id
            slug
          }
        }
      }
    }
  `)

  return edges.map(({ node }) => node).filter(Boolean)
}

export default useSocialProfiles
