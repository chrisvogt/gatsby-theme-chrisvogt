import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site: { siteMetadata } = {} } = useStaticQuery(
    graphql`
      query GetSiteMetadata {
        site {
          siteMetadata {
            social {
              github {
                username
              }
              goodreads {
                username
              }
              instagram {
                username
              }
              twitter {
                username
              }
            }
            imageURL
            headline
            description
            baseURL
            footerText
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
