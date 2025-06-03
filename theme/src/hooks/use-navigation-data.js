import { useStaticQuery, graphql } from 'gatsby'

const selectPayload = data => data?.allDataJson?.edges?.[0]?.node?.payload || {}

const useNavigationData = () => {
  const response = useStaticQuery(graphql`
    query MyQuery {
      allDataJson(filter: { key: { eq: "navigation" } }) {
        edges {
          node {
            payload {
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
    }
  `)

  const payload = selectPayload(response)
  return payload
}

export default useNavigationData
