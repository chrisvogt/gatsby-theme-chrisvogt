/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import theme from '../gatsby-plugin-theme-ui'
import Header from '../components/header'
import Footer from '../components/footer'
import Layout from '../components/layout'
import SwoopBottom from '../components/artwork/swoop-bottom'

const PostTemplate = ({ data }) => {
  const { mdx } = data

  return (
    <Layout>
      <Header swoopFill={'white'} styles={{ py: 2 }}>
        <Container>
          <h1>{mdx.frontmatter.title}</h1>
        </Container>
      </Header>
      <div
        sx={{
          backgroundColor: `colors.background`,
          minHeight: `500px`,
          pt: 4
        }}
      >
        <Container>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
        <SwoopBottom fill={theme.colors.secondary} />
      </div>
      <Footer />
    </Layout>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      body
      frontmatter {
        title
        description
      }
    }
  }
`

export default PostTemplate
