/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Flex } from '@theme-ui/components'
import { graphql } from 'gatsby'

import { getPosts } from '../hooks/use-recent-posts'
import Layout from '../components/layout'
import PostCard from '../components/widgets/recent-posts/post-card'
import SEO from '../components/seo'

export default ({ data }) => {
  const posts = getPosts(data)
  return (
    <Layout>
      <SEO title='Latest Content' description='A list of the most recent articles published on my blog.' />

      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          py: 3
        }}
      >
        <Container sx={{ flexGrow: 1 }}>
          <Themed.h1>Blog</Themed.h1>

          <Themed.div
            sx={{
              display: `grid`,
              gridAutoRows: `1fr`,
              gridGap: 4,
              gridTemplateColumns: [``, ``, `repeat(2, 1fr)`],
              mt: 4
            }}
          >
            {posts.map(post => (
              <PostCard
                banner={post.frontmatter.banner}
                category={post.fields.category}
                date={post.frontmatter.date}
                excerpt={post.excerpt}
                key={post.fields.id}
                link={`/${post.fields.category}/${post.fields.slug}`}
                title={post.frontmatter.title}
              />
            ))}
          </Themed.div>
        </Container>
      </Flex>
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
