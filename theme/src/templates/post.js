/** @jsx jsx */
import { Container, Flex, jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { Heading } from '@theme-ui/components'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>{mdx.frontmatter.title} | Blog Post</title>
        <meta name='description' content={mdx.frontmatter.description} />
      </Helmet>
      <Header swoopFill={theme.colors.background} styles={{ py: 2 }}>
        <Container>
          <Heading>Blog</Heading>
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
          <Heading as='h1'>{mdx.frontmatter.title}</Heading>
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
