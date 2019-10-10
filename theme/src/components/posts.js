/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import Container from './container'

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
  <Container background="#f8f9fa">
    <h3
      sx={{
        backgroundColor: 'white',
        mt: 0,
        mb: 3,
        padding: 3
      }}
    >
      Blog Posts
    </h3>
    <Styled.div
      sx={{
        display: 'grid',
        gridAutoRows: '1fr',
        gridGap: '1rem',
        gridTemplateColumns: ['', '', 'repeat(2, 1fr)']
      }}
    >
      {mockPosts.map((post, index) => (
        <div
          key={post.slug}
          sx={{
            backgroundColor: 'white',
            padding: 3
          }}
        >
          <span>{post.title}</span>
          <span>{post.createdAt}</span>
          <p>{post.excerpt}</p>
          <a href="/">View post</a>
        </div>
      ))}
    </Styled.div>
  </Container>
)
