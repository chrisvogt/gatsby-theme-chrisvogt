import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site: { siteMetadata } = {} } = useStaticQuery(
    graphql`
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
              github {
                username
                widgetDataSource
              }
              goodreads {
                username
                widgetDataSourceBooks
                widgetDataSourceProfile
              }
              instagram {
                username
                widgetDataSource
              }
              spotify {
                username
                widgetDataSource
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
