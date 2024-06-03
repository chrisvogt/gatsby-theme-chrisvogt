/** @jsx jsx */
import { jsx, Card, Container, Grid } from 'theme-ui'
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
        <Container>
          <TopNavigation hideBackground hideMenuItems />
        </Container>
      </Header>

      <Themed.div
        sx={{
          minHeight: `500px`,
          pt: 3,
          px: 0
        }}
      >
        <Container>
          <Grid
            columns={[
              null,
              null,
              `0.375fr 1.625fr`, /* Sidebar 18%, Content 82% */
              `0.4fr 1.6fr` /* Sidebar 20%, Content 80% */
            ]}
            gap={[null, 4]}
          >
            <aside sx={{ mb: [4, null] }}>
              <HomeNavigation />
            </aside>
            <main>
              <section>
                <div sx={{ mb: 5 }}>
                  <HomeHeaderContent
                    avatar={avatar}
                    headline={headline}
                    subhead={subhead}
                  />
                </div>
              </section>
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
