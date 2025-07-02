/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { graphql } from 'gatsby'

import Category from '../components/category'
import Layout from '../components/layout'
import PageHeader from '../components/blog/page-header'
import Seo from '../components/seo'

const PostTemplate = ({ children, data }) => {
  const { mdx } = data

  const category = mdx.fields.category
  const date = mdx.frontmatter.date
  const title = mdx.frontmatter.title
  const description = mdx.frontmatter.description
  const banner = mdx.frontmatter.banner
  const keywords = mdx.frontmatter.keywords
  const path = mdx.fields.path

  // Build canonical URL
  const canonicalUrl = `https://www.chrisvogt.me${path}`

  return (
    <Layout>
      <Themed.div sx={{ py: 3 }}>
        <Container sx={{ position: 'relative', width: ['', '', 'max(80ch, 50vw)'], lineHeight: 1.7 }}>
          <article className='h-entry c1v0-blog-post' id={mdx.id}>
            {category && <Category type={category} sx={{ mb: 2 }} />}

            <PageHeader>{title}</PageHeader>

            <Themed.div
              sx={{
                color: 'textMuted',
                fontFamily: 'sans',
                fontSize: 1
              }}
            >
              <time className='dt-published created'>Published {date}</time>
            </Themed.div>

            {/* Hidden microformats data */}
            <div style={{ display: 'none' }}>
              <a className='u-url' href={canonicalUrl} />
              <span className='u-uid'>{mdx.id}</span>
              {description && <div className='p-summary'>{description}</div>}
              {banner && <img className='u-photo' src={banner} alt='' />}
              {category && <span className='p-category'>{category}</span>}
              {keywords &&
                keywords.map((keyword, index) => (
                  <span key={index} className='p-category'>
                    {keyword}
                  </span>
                ))}
            </div>

            <div className='e-content article-content'>{children}</div>
          </article>
        </Container>
      </Themed.div>
    </Layout>
  )
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
      id
      fields {
        category
        path
      }
      frontmatter {
        banner
        date(formatString: "MMMM DD, YYYY")
        description
        keywords
        title
      }
    }
  }
`

export default PostTemplate
