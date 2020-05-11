import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

const selectPayload = data => {
  const payload = get(data, 'allDataJson.edges[0].node.payload', {})
  return payload
}

const useNavigationData = () => {
  const response = useStaticQuery(
    graphql`
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
    `
  )

  const payload = selectPayload(response)
  return payload
}

export default useNavigationData
