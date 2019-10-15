/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet'

export default () => (
  <Fragment>
    <Helmet>
      <title>Blog Posts</title>
      <meta name='description' content='Recent articles from my blog.' />
    </Helmet>
    <Container>
      <p>Test</p>
    </Container>
  </Fragment>
)
