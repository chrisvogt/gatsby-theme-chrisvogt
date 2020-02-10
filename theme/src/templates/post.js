/** @jsx jsx */
import { Container, Flex, jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { Heading } from '@theme-ui/components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import PropTypes from 'prop-types'

import Header from '../components/header'
import Footer from '../components/footer'
import Layout from '../components/layout'
import SEO from '../components/seo'
import YouTube from '../shortcodes/youtube'

const shortcodes = { YouTube }

const PostTemplate = ({ data }) => {
  const { mdx } = data

  return (
    <Layout>
      <SEO
        article={true}
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        image={mdx.frontmatter.banner}
      />

      <Header styles={{ py: 2 }}>&nbsp;</Header>

      <Flex
        sx={{
          backgroundColor: `colors.background`,
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ flexGrow: 1 }}>
          <time className='created'>{mdx.frontmatter.date}</time>

          <Styled.h1 as={Heading}>
            {mdx.frontmatter.title}
            {mdx.frontmatter.type}
          </Styled.h1>

          <div className='article-content'>
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>
          </div>
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
        banner
        date(formatString: "MMMM DD, YYYY")
        description
        title
      }
    }
  }
`

export default PostTemplate
