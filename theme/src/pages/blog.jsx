/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui'
import { Flex } from '@theme-ui/components'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { getPosts } from '../hooks/use-recent-posts'

import Footer from '../components/footer'
import Header from '../components/header'
import Layout from '../components/layout'
import PostCard from '../components/widgets/blog/post-card'

export default ({ data }) => {
  const posts = getPosts(data)
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

      <Flex
        sx={{
          backgroundColor: `colors.background`,
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ flexGrow: 1 }}>
          <Styled.div
            sx={{
              display: `grid`,
              gridAutoRows: `1fr`,
              gridGap: 4,
              gridTemplateColumns: [``, ``, `repeat(2, 1fr)`]
            }}
          >
            {posts.map(post => (
              <PostCard
                category={post.fields.category}
                date={post.frontmatter.date}
                excerpt={post.excerpt}
                key={post.fields.id}
                link={post.fields.slug}
                title={post.frontmatter.title}
              />
            ))}
          </Styled.div>
        </Container>
      </Flex>

      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query QueryRecentPosts {
    allMdx {
      edges {
        node {
          excerpt(pruneLength: 255)
          fields {
            category
            slug
            id
          }
          frontmatter {
            banner
            date(formatString: "MMMM DD, YYYY")
            description
            slug
            title
          }
        }
      }
    }
  }
`
