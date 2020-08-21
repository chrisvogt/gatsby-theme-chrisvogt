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
                widgetDataSourceBooks
                widgetDataSourceProfile
              }
              instagram {
                username
                widgetDataSource
              }
              profiles {
                widgetDataSourceMetas
                widgetDataSourceProfiles
              }
              spotify {
                username
                widgetDataSource
              }
            }
          }
        }
      }
    `
  )

  return siteMetadata
}

export default useSiteMetadata
