/** @jsx jsx */
import { Container, Flex, jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { graphql } from 'gatsby'
import { Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import Seo from '../components/seo'

const PostTemplate = ({ children, data }) => {
  const { mdx } = data

  const category = mdx.fields.category
  const date = mdx.frontmatter.date
  const title = mdx.frontmatter.title

  return (
    <Layout>
      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ height: `100%` }}>
          <article className='h-entry'>
            {category && (
              <Themed.div
                className='p-category'
                sx={{ variant: `text.title` }}
              >
                {category}
              </Themed.div>
            )}

            <Themed.div sx={{ fontSize: [2, 3] }}>
              <time className='dt-published created'>
                {date}
              </time>
            </Themed.div>

            <Themed.h1
              as={Heading}
              className='p-name'
            >
              {title}
            </Themed.h1>

            <div className='e-content article-content'>
              {children}
            </div>
          </article>
        </Container>
      </Flex>
    </Layout>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
}

export const Head = ({ data: { mdx } }) => {
  const banner = mdx.frontmatter.banner
  const description = mdx.frontmatter.description
  const title = mdx.frontmatter.title

  return (
    <Seo
      article={true}
      description={description}
      image={banner}
      title={title}
    />
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
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
