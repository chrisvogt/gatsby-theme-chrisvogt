/** @jsx jsx */
import { Container, jsx, Themed } from 'theme-ui'
import { Flex } from '@theme-ui/components'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

const AboutIndexPage = () => (
  <Layout>
    <SEO
      title='About'
      description='Learn more about me or this website.'
    />

      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ flexGrow: 1 }}>
          <Themed.h1>About</Themed.h1>
          <p>Lorum ipsum dolor sit amet.</p>
        </Container>
      </Flex>
  </Layout>
);

export default AboutIndexPage;
