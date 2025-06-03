import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site: { siteMetadata } = {} } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          baseURL
          description
          footerText
          headline
          imageURL
          languageCode
          social {
            twitterUsername
          }
          subhead
          title
          titleTemplate
          widgets {
            github {
              username
              widgetDataSource
            }
            goodreads {
              username
              widgetDataSource
            }
            instagram {
              username
              widgetDataSource
            }
            spotify {
              username
              widgetDataSource
            }
            steam {
              username
              widgetDataSource
            }
          }
        }
      }
    }
  `)

  return siteMetadata
}

export default useSiteMetadata
