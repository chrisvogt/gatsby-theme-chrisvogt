/** @jsx jsx */
import { Box, Container, Grid, jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import Header from '../components/header'
import HomeHeaderContent from '../components/home-header-content'
import HomeNavigation from '../components/home-navigation.js'
import HomeWidgets from '../components/home-widgets'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TopNavigation from '../components/top-navigation'

import { getAvatarURL, getHeadline, getSubhead } from '../selectors/metadata'

const HomeTemplate = props => {
  const { data: { site: { siteMetadata = {} } = {} } = {} } = props

  const avatar = getAvatarURL(siteMetadata)
  const headline = getHeadline(siteMetadata)
  const subhead = getSubhead(siteMetadata)

  return (
    <Layout hideHeader>
      <SEO title='Home' />

      <Header showSwoop hideTopPadding>
        <TopNavigation hideBackground />
        <HomeHeaderContent
          avatar={avatar}
          headline={headline}
          subhead={subhead}
        />
      </Header>

      <div
        sx={{
          minHeight: `500px`,
          pt: 3
        }}
      >
        <Container>
          <Grid columns={[null, null, `.5fr 2fr`]}>
            <aside>
              <HomeNavigation />
            </aside>
            <main>
              <HomeWidgets />
            </main>
          </Grid>
        </Container>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        avatarURL
        description
        headline
        subhead
        title
        titleTemplate
      }
    }
  }
`

export default HomeTemplate
