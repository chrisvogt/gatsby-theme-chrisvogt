/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Flex } from '@theme-ui/components'
import { graphql } from 'gatsby'

import { getPosts } from '../hooks/use-recent-posts'
import Layout from '../components/layout'
import PageHeader from '../components/blog/page-header'
import PostCard from '../components/widgets/recent-posts/post-card'

const BlogIndexPage = ({ data }) => {
  const posts = getPosts(data)?.filter(
    post =>
      !(
        post.fields.category?.startsWith('photography') ||
        post.fields.category?.startsWith('music') ||
        post.frontmatter.slug === 'now'
      )
  )

  return (
    <Layout>
      <Flex
        sx={{
          flexDirection: 'column',
          flexGrow: 1,
          position: 'relative',
          py: 3
        }}
      >
        <Container sx={{ flexGrow: 1, width: ['', '', 'max(80ch, 50vw)'] }}>
          <PageHeader>Blog Posts</PageHeader>

          <Themed.div
            sx={{
              display: 'grid',
              gridAutoRows: '1fr',
              gridGap: 4,
              gridTemplateColumns: '1fr',
              mt: 4
            }}
          >
            {posts.map(post => (
              <PostCard
                category={post.fields.category}
                date={post.frontmatter.date}
                // excerpt={post.excerpt}
                key={post.fields.id}
                link={post.fields.path}
                title={post.frontmatter.title}
              />
            ))}
          </Themed.div>
        </Container>
      </Flex>
    </Layout>
  )
}

export { default as Head } from './blog-head'

export const pageQuery = graphql`
  query QueryRecentPosts {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt(pruneLength: 255)
          fields {
            category
            id
            path
          }
          frontmatter {
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

export default BlogIndexPage
