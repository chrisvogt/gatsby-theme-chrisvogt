/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

export default ({ allMdx }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Blog Posts</title>
        <meta name='description' content='Recent articles from my blog.' />
      </Helmet>
      <Container>
        <p>Test</p>
      </Container>
    </Fragment>
  )
}

export const pageQuery = graphql`
  query QueryRecentPosts {
    allMdx {
      edges {
        node {
          fields {
            slug
            id
          }
          frontmatter {
            title
            description
            banner
            categories
            date
          }
          excerpt(pruneLength: 255)
        }
      }
    }
  }
`
