/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { Link } from 'gatsby'

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
  <Container id='posts' sx={{ mb: 4, variant: `styles.Widget` }}>
    <Styled.h3 sx={{ variant: `styles.WidgetHeadline` }}>Blog Posts</Styled.h3>
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
            borderBottom: `1px solid #ededed`,
            borderTop: `1px solid #ededed`,
            backgroundColor: `white`,
            borderRadius: `2px`,
            borderLeft: `3px solid`,
            borderLeftColor: `primary`,
            padding: 3
          }}
        >
          <Styled.h4>{post.title}</Styled.h4>
          <span>{post.createdAt}</span>
          <p>{post.excerpt}</p>
          <div style={{ textAlign: `right` }}>
            <Styled.a href='/'>View post &raquo;</Styled.a>
          </div>
        </div>
      ))}
    </Styled.div>
    <p sx={{ textAlign: `right`, marginTop: 4 }}>
      <Styled.a
        as={Link}
        to='/blog'
        sx={{
          color: `dark`,
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
