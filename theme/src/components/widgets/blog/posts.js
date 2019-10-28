/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import { Link } from 'gatsby'

import PostCard from './post-card'
import useRecentPosts from '../../../hooks/use-recent-posts'

export default () => {
  const posts = useRecentPosts()
  const getColumnCount = postsCount => {
    let columnCount
    switch (postsCount) {
      case 1:
        columnCount = 1
        break
      case 2:
        columnCount = 2
        break
      default:
        columnCount = 3
    }
    return columnCount
  }
  return (
    <Container id='posts' sx={{ mb: 4, variant: `styles.Widget` }}>
      <Heading sx={{ variant: `styles.WidgetHeadline` }}>Blog Posts</Heading>
      <div
        sx={{
          background: `blue`,
          width: `100%`
        }}
      >
        <Styled.div
          sx={{
            display: `grid`,
            gridAutoRows: `1fr`,
            gridGap: 4,
            gridTemplateColumns: [
              ``,
              ``,
              `repeat(${getColumnCount(posts.length)}, 1fr)`
            ]
          }}
        >
          {posts.map(post => (
            <PostCard
              createdAt={post.frontmatter.createdAt}
              excerpt={post.excerpt}
              key={post.frontmatter.slug}
              link={post.frontmatter.slug}
              title={post.frontmatter.title}
            />
          ))}
        </Styled.div>
      </div>
      <p sx={{ textAlign: `right`, marginTop: 4 }}>
        <Styled.a
          as={Link}
          to='/blog'
          sx={{
            fontFamily: `heading`,
            fontSize: 3,
            textDecoration: `none`
          }}
        >
          View blog posts &raquo;
        </Styled.a>
      </p>
    </Container>
  )
}
