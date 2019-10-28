/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

export default ({ createdAt, excerpt, link, title }) => (
  <Link
    sx={{
      color: `text`,
      textDecoration: `none`,
      variant: `styles.PostCard`
    }}
    to={link}
  >
    <Styled.h4>{title}</Styled.h4>
    {createdAt && <span>{createdAt}</span>}
    <p>{excerpt}</p>
    <div style={{ textAlign: `right` }}>
      <span>View post &raquo;</span>
    </div>
  </Link>
)
