/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import useRecentPosts from '../../hooks/use-recent-posts'

export default () => {
  const posts = useRecentPosts()
  return (
    <Container id='posts' sx={{ mb: 4, variant: `styles.Widget` }}>
      <Styled.h3 sx={{ variant: `styles.WidgetHeadline` }}>
        Blog Posts
      </Styled.h3>
      <Styled.div
        sx={{
          display: `grid`,
          gridAutoRows: `1fr`,
          gridGap: 4,
          gridTemplateColumns: [``, ``, `repeat(2, 1fr)`]
        }}
      >
        {posts.map((post, index) => (
          <div
            key={post.frontmatter.slug}
            sx={{
              variant: `styles.PostCard`
            }}
          >
            <Styled.h4>{post.frontmatter.title}</Styled.h4>
            <span>{post.frontmatter.createdAt}</span>
            <p>{post.excerpt}</p>
            <div style={{ textAlign: `right` }}>
              <Styled.a as={Link} to={`${post.frontmatter.slug}`}>
                View post &raquo;
              </Styled.a>
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
}
