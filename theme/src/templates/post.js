/** @jsx jsx */
import { Container, Flex, jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import Header from '../components/header'
import Footer from '../components/footer'
import Layout from '../components/layout'
import SwoopBottom from '../components/artwork/swoop-bottom'

import theme from '../gatsby-plugin-theme-ui'

const PostTemplate = ({ data }) => {
  const { mdx } = data

  return (
    <Layout>
      <Header swoopFill={theme.colors.background} styles={{ py: 2 }}>
        <Container>
          <h1>{mdx.frontmatter.title}</h1>
        </Container>
      </Header>
      <Flex
        sx={{
          backgroundColor: `colors.background`,
          flexDirection: `column`,
          flexGrow: 1,
          pc: 2,
          pt: 4
        }}
      >
        <Container sx={{ flexGrow: 1 }}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
        <SwoopBottom fill={theme.colors.light} />
      </Flex>
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
