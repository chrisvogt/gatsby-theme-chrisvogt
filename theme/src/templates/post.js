/** @jsx jsx */
import { Container, Flex, jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { Heading } from '@theme-ui/components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import Footer from '../components/footer'
import Layout from '../components/layout'
import SEO from '../components/seo'

const PostTemplate = ({ data }) => {
  const { mdx } = data

  const banner = mdx.frontmatter.banner
  const category = mdx.fields.category
  const date = mdx.frontmatter.date
  const description = mdx.frontmatter.description
  const title = mdx.frontmatter.title

  return (
    <Layout>
      <SEO
        article={true}
        description={description}
        image={banner}
        title={title}
      />

      <Flex
        sx={{
          backgroundColor: `colors.background`,
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ height: `100%` }}>
          {category && <div sx={{ variant: `text.title` }}>{category}</div>}

          <time className='created'>{date}</time>

          <Styled.h1 as={Heading}>{title}</Styled.h1>

          <div className='article-content'>
            <MDXRenderer>{mdx.body}</MDXRenderer>
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
      fields {
        category
      }
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
