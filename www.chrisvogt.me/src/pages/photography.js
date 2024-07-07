/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Flex } from '@theme-ui/components'
import { graphql } from 'gatsby'

import { getPosts } from '../../../theme/src/hooks/use-recent-posts'
import Layout from '../../../theme/src/components/layout'
import PageHeader from '../../../theme/src/components/blog/page-header'
import PostCard from '../../../theme/src/components/widgets/recent-posts/post-card'
import Seo from '../../../theme/src/components/seo'

const PhotographyPage = ({ data }) => {
const posts = getPosts(data)?.filter(post => post.fields.category?.startsWith('photography'))
  return (
    <Layout>
      <Flex
        sx={{
          flexDirection: `column`,
          flexGrow: 1,
          position: 'relative',
          py: 3
        }}
      >
        <Container sx={{ flexGrow: 1, width: ['', '', 'max(95ch, 50vw)'] }}>
          <PageHeader>
            My Photo Galleries
          </PageHeader>

          <Themed.div
            sx={{
              display: `grid`,
              gridAutoRows: `1fr`,
              gridGap: 4,
              gridTemplateColumns: `1fr`,
              mt: 4
            }}
          >
            {posts.map(post => (
              <PostCard
                category={post.fields.category?.replace('photography/', '')}
                date={post.frontmatter.date}
                excerpt={post.excerpt}
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

export const Head = () => (
  <Seo
    title="Chris Vogt's Photo Galleries - Street & Travel Photography"
    description="Explore Chris Vogt's photo galleries featuring street and travel photography. Each gallery showcases unique perspectives and moments captured with a Sony Alpha camera on chrisvogt.me."
  >
    <meta property='og:url' content='https://www.chrisvogt.me/photography/' />
    <meta property='og:type' content='website' />
  </Seo>
)

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

export default PhotographyPage
