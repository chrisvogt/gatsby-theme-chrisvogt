/** @jsx jsx */
import { jsx, Container, Grid } from 'theme-ui'
import { graphql } from 'gatsby'

import Header from '../components/header'
import HomeHeaderContent from '../components/home-header-content'
import HomeNavigation from '../components/home-navigation.js'
import HomeWidgets from '../components/home-widgets'
import Layout from '../components/layout'
import Seo from '../components/seo'
import TopNavigation from '../components/top-navigation'

const HomeTemplate = props => {
  return (
    <Layout hideHeader>
      <Header showSwoop hideTopPadding>
        <Container>
          <TopNavigation hideBackground hideMenuItems />
        </Container>
      </Header>

      <div
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
                <HomeHeaderContent />
              </section>
              <HomeWidgets />
            </main>
          </Grid>
        </Container>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title='Chris Vogt - Senior Software Engineer in San Francisco | Digital Garden of Photography, Piano, and Travel'
    description="Explore Chris Vogt's digital garden. A Senior Software Engineer at GoDaddy, Chris shares his interest in photography, piano, and travel."
    keywords='Chris Vogt, Senior Software Engineer, GoDaddy, photography, piano, travel, blog, digital garden'
  >
    <meta property="og:url" content="https://www.chrisvogt.me" />
    <meta property="og:type" content="website" />
    <meta name="naver-site-verification" content="9f0709febb11d387af7361215096bf7e0a35fc82" />
    <script type="application/ld+json">
      {`{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Chris Vogt",
        "url": "https://www.chrisvogt.me",
        "sameAs": [
          "https://linkedin.com/in/cjvogt",
          "https://github.com/chrisvogt",
          "https://x.com/c1v0",
          "https://twitter.com/c1v0",
          "https://www.instagram.com/c1v0",
          "https://stackoverflow.com/users/1391826/chris-vogt"
        ],
        "jobTitle": "Senior Software Engineer",
        "worksFor": {
          "@type": "Organization",
          "name": "GoDaddy"
        }
      }`}
    </script>
  </Seo>
)

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
