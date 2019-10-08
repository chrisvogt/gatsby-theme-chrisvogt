import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site: { siteMetadata } = {} } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            baseURL
            description
            imageURL
            social {
              github {
                username
              }
              twitter {
                username
              }
            }
            title
            titleTemplate
          }
        }
      }
    `
  )

  return siteMetadata
}

export default useSiteMetadata
