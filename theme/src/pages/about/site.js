/** @jsx jsx */
import { Container, jsx, Themed } from 'theme-ui'
import { Flex } from '@theme-ui/components'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

const AboutSitePage = () => (
  <Layout>
    <SEO
      title='About Me'
      description='A list of the most recent articles published on my blog.'
    />

      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ flexGrow: 1 }}>
          <Themed.h1>
            About this site
          </Themed.h1>

          <p>
            This website first came into existence in September 2012 as a
            timeline of my social feeds. It spent the next decade evolving into
            a hybrid blog and showcase of my personal projects.
          </p>

          <p>Lorum ipsum...</p>
        </Container>
      </Flex>
  </Layout>
);

export default AboutSitePage;
