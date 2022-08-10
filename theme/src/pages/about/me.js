/** @jsx jsx */
import { Container, jsx, Themed } from 'theme-ui'
import { Flex } from '@theme-ui/components'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

const AboutMePage = () => (
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
          <Themed.h1>About Me</Themed.h1>
          <p>Lorum ipsum dolor sit amet.</p>
        </Container>
      </Flex>
  </Layout>
);

export default AboutMePage;
