/** @jsx jsx */
import { jsx, Container, Grid } from 'theme-ui'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import Footer from '../components/footer'
import HCard from '../components/h-card.js'
import HomeHeaderContent from '../components/home-header-content'
import HomeNavigation from '../components/home-navigation.js'
import HomeWidgets from '../components/home-widgets'
import Layout from '../components/layout'
import HomeHead from './home-head'

const HomeTemplate = () => (
  <Layout hideFooter disableMainWrapper>
    <div
      sx={{
        minHeight: '500px',
        pt: 3,
        px: 0
      }}
    >
      <Container>
        <Grid
          columns={[
            null,
            null,
            '0.375fr 1.625fr' /* Sidebar 18%, Content 82% */,
            '0.4fr 1.6fr' /* Sidebar 20%, Content 80% */
          ]}
          gap={[null, 4]}
        >
          <aside sx={{ mb: [4, null] }}>
            <HomeNavigation />
          </aside>
          <main role='main'>
            <SkipNavContent />
            <div
              sx={{
                position: 'relative',
                borderTopRightRadius: '3em',
                borderTopLeftRadius: '.5em',
                px: [3, 4],
                pt: [2, 3]
              }}
            >
              <div
                sx={{
                  maxWidth: '1200px'
                }}
              >
                <section>
                  <HomeHeaderContent />
                </section>
                <HomeWidgets />
              </div>
            </div>
            <Footer />
            <HCard />
          </main>
        </Grid>
      </Container>
    </div>
  </Layout>
)

export const Head = () => <HomeHead />

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
