/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { Grid, Heading } from '@theme-ui/components'
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
      <div sx={{ width: `100%` }}>
        <Grid
          sx={{
            display: `grid`,
            gridAutoRows: `1fr`,
            gridGap: '1rem',
            gridTemplateColumns: [
              ``,
              ``,
              `repeat(${getColumnCount(posts.length)}, 1fr)`
            ]
          }}
        >
          {posts.map(post => (
            <PostCard
              createdAt={post.frontmatter.date}
              excerpt={post.excerpt}
              key={post.fields.id}
              link={post.fields.slug}
              title={post.frontmatter.title}
            />
          ))}
        </Grid>
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
