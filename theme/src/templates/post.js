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
      <Container sx={{ width: ['', 'max(75ch, 50vw)'], lineHeight: 1.7 }}>
        <article className='h-entry'>
          {category && (
            <Themed.div className='p-category' sx={{ variant: `text.title` }}>
              {category}
            </Themed.div>
          )}

          <Themed.h1 as={Heading} className='p-name' sx={{ background: 'blue', width: 'max(45ch, 33%)' }}>
            {title}
          </Themed.h1>

          <Themed.div sx={{ fontSize: [2, 3] }}>
            <time className='dt-published created'>{date}</time>
          </Themed.div>

          <div className='e-content article-content'>
            {children}
          </div>
        </article>
      </Container>
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

  return <Seo article={true} description={description} image={banner} title={title} />
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
