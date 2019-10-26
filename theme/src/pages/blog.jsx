/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { getPosts } from '../hooks/use-recent-posts'

import Footer from '../components/footer'
import Header from '../components/header'
import Layout from '../components/layout'
import Post from '../components/widgets/blog/post'

export default ({ data }) => {
  const posts = getPosts(data)
  console.log(posts)
  return (
    <Layout>
      <Helmet>
        <title>Blog</title>
        <meta name='description' content='Recent articles from my blog.' />
      </Helmet>
      <Header swoopFill={'white'} styles={{ py: 2 }}>
        <Container>
          <h1>Blog Posts</h1>
        </Container>
      </Header>
      <Container>
        <Styled.div
          sx={{
            display: `grid`,
            gridAutoRows: `1fr`,
            gridGap: 4,
            gridTemplateColumns: [``, ``, `repeat(1, 1fr)`]
          }}
        >
          {posts.map(post => (
            <Post
              created={post.frontmatter.createdAt}
              key={post.frontmatter.slug}
              excerpt={post.excerpt}
              title={post.frontmatter.title}
              to={post.frontmatter.slug}
            />
          ))}
        </Styled.div>
      </Container>
      <Footer />
    </Layout>
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
