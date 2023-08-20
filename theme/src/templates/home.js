/** @jsx jsx */
import { jsx, Container, Grid } from 'theme-ui'
import { graphql } from 'gatsby'
import { Themed } from '@theme-ui/mdx'

import Header from '../components/header'
import HomeHeaderContent from '../components/home-header-content'
import HomeNavigation from '../components/home-navigation.js'
import HomeWidgets from '../components/home-widgets'
import Layout from '../components/layout'
import Seo from '../components/seo'
import TopNavigation from '../components/top-navigation'

import { getAvatarURL, getHeadline, getSubhead } from '../selectors/metadata'

const HomeTemplate = props => {
  const siteMetadata = props.data?.site?.siteMetadata || {}

  const avatar = getAvatarURL(siteMetadata)
  const headline = getHeadline(siteMetadata)
  const subhead = getSubhead(siteMetadata)

  return (
    <Layout hideHeader>
      <Header showSwoop hideTopPadding>
      <TopNavigation hideBackground hideMenuItems />
        <HomeHeaderContent avatar={avatar} headline={headline} subhead={subhead} />
      </Header>

      <Themed.div
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
      </Themed.div>
    </Layout>
  )
}

export const Head = () => <Seo title='Home' />

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
