/** @jsx jsx */
import React from 'react';
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

  return (
    <Layout>
      <Themed.div sx={{ py: 3 }}>
        <Container sx={{ position: 'relative', width: ['', '', 'max(80ch, 50vw)'], lineHeight: 1.7 }}>
          <article className='h-entry c1v0-blog-post'>
            {category && (
              <Category type={category} sx={{ mb: 2 }} />
            )}

            <PageHeader>
              {title}
            </PageHeader>

            <Themed.div sx={{
              color: `textMuted`,
              fontFamily: `sans`,
              fontSize: 1
            }}>
              <time className='dt-published created'>
                Published {date}
              </time>
            </Themed.div>

            <div className='e-content article-content'>
              {children}
            </div>
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
