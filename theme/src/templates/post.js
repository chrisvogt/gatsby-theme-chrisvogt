/** @jsx jsx */
import { Container, Flex, jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { Heading } from '@theme-ui/components'
import { Helmet } from 'react-helmet'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import PropTypes from 'prop-types'

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from '../components/header'
import Footer from '../components/footer'
import Layout from '../components/layout'
import YouTube from '../shortcodes/youtube'

import theme from '../gatsby-plugin-theme-ui'

const shortcodes = { YouTube }

const PostTemplate = ({ data }) => {
  const { mdx } = data

  return (
    <Layout>
      <Helmet>
        <title>{mdx.frontmatter.title} – Blog Post</title>
        <meta name='description' content={mdx.frontmatter.description} />
      </Helmet>

      <Header swoopFill={theme.colors.background} styles={{ py: 3 }}>
        <Container>
          <Styled.h1 as={Heading} sx={{ pt: 3 }}>
            {mdx.frontmatter.title}
            {mdx.frontmatter.type}
          </Styled.h1>
          <span>
            <FontAwesomeIcon icon={faCalendarAlt} /> {mdx.frontmatter.date}
          </span>
        </Container>
      </Header>

      <Flex
        sx={{
          backgroundColor: `colors.background`,
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ flexGrow: 1 }}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </Container>
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
        date(formatString: "MMMM DD, YYYY")
        description
        title
      }
    }
  }
`

export default PostTemplate
