/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui'
import { Flex } from '@theme-ui/components'
import { graphql } from 'gatsby'

import { getPosts } from '../hooks/use-recent-posts'

import Footer from '../components/footer'
import Header from '../components/header'
import Layout from '../components/layout'
import PostCard from '../components/widgets/recent-posts/post-card'
import SEO from '../components/seo'

export default ({ data }) => {
  const posts = getPosts(data)
  return (
    <Layout>
      <SEO
        title='Recent Blog Posts'
        description='An overview of recent articles posted to my blog'
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
          <h1>Blog Posts</h1>
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
                banner={post.frontmatter.banner}
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
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
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
