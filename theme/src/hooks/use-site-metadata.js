import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site: { siteMetadata } = {} } = useStaticQuery(
    graphql`
      query GetSiteMetadata {
        site {
          siteMetadata {
            baseURL
            description
            footerText
            headline
            imageURL
            languageCode
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
