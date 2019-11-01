/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'
import ago from 's-ago'

export default ({ createdAt, excerpt, link, title }) => (
  <Link sx={{ variant: `styles.PostCard` }} to={link}>
    <Styled.h4>{title}</Styled.h4>
    {createdAt && <span>Posted {ago(new Date(createdAt))}</span>}
    <p>{excerpt}</p>
    <div style={{ textAlign: `right` }}>
      <span>View post &raquo;</span>
    </div>
  </Link>
)
