/** @jsx jsx */
import { jsx, Container, Flex, Grid, Themed } from 'theme-ui'
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
  const siteMetadata = props.data?.site?.siteMetadata || {}

  const avatar = getAvatarURL(siteMetadata)
  const headline = getHeadline(siteMetadata)
  const subhead = getSubhead(siteMetadata)

  return (
    <Layout hideHeader>
      <SEO title='Home' />

      <Header showSwoop hideTopPadding>
      <TopNavigation hideBackground hideMenuItems />
        <HomeHeaderContent avatar={avatar} headline={headline} subhead={subhead} />
      </Header>

      <div
        sx={{
          minHeight: `500px`,
          pt: 3
        }}
      >
        <Container>
          <Grid columns={[null, null, `.67fr 1.5fr`]} gap={[null, 4]}>
            <aside sx={{ mb: [4, null] }}>
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
