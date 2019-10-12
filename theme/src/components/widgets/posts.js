/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'

const mockPosts = [
  {
    title: 'My Blog Post',
    createdAt: new Date().toDateString(),
    excerpt: `
Lorum ipsum dolor sit amet. Lingus dingus herple derple moop mc-meep, and then some!`,
    relativeURL: '/posts/derp',
    slug: 'derp1'
  },
  {
    title: 'My Blog Post',
    createdAt: new Date().toDateString(),
    excerpt: `
Lorum ipsum dolor sit amet. Lingus dingus herple derple moop mc-meep, and then some!`,
    relativeURL: '/posts/derp',
    slug: 'derp2'
  }
]

export default () => (
  <Container
    sx={{
      backgroundColor: `#f8f9fa`
    }}
  >
    <h3
      sx={{
        backgroundColor: `white`,
        mt: 0,
        mb: 4,
        padding: 3
      }}
    >
      Blog Posts
    </h3>
    <Styled.div
      sx={{
        display: `grid`,
        gridAutoRows: `1fr`,
        gridGap: 4,
        gridTemplateColumns: [``, ``, `repeat(2, 1fr)`]
      }}
    >
      {mockPosts.map((post, index) => (
        <div
          key={post.slug}
          sx={{
            backgroundColor: `white`,
            padding: 3
          }}
        >
          <Styled.h5>{post.title}</Styled.h5>
          <span>{post.createdAt}</span>
          <p>{post.excerpt}</p>
          <a href='/'>View post</a>
        </div>
      ))}
    </Styled.div>
  </Container>
)
