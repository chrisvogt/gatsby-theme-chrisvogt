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
    id='posts'
    sx={{
      backgroundColor: `#f8f9fa`
    }}
  >
    <div
      sx={{
        backgroundColor: `white`,
        display: `grid`,
        gridGap: 0,
        gridTemplateColumns: [``, ``, `1fr 50%`],
        mb: 4
      }}
    >
      <div>
        <Styled.h3
          sx={{
            mt: 0,
            padding: 3
          }}
        >
          Blog Posts
        </Styled.h3>
      </div>
      <div
        sx={{
          flexDirection: `column`,
          justifyContent: `center`
        }}
      >
        BUTTON
      </div>
    </div>
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
          <Styled.h4>{post.title}</Styled.h4>
          <span>{post.createdAt}</span>
          <p>{post.excerpt}</p>
          <a href='/'>View post</a>
        </div>
      ))}
    </Styled.div>
  </Container>
)
