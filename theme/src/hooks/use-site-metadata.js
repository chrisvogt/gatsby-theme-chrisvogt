import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site: { siteMetadata } = {} } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            baseURL
            description
            headline
            imageURL
            social {
              github {
                username
              }
              twitter {
                username
              }
            }
            subhead
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
