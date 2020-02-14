/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

export default ({ banner, date, excerpt, link, title }) => (
  <Link sx={{ variant: `styles.PostCard` }} to={link}>
    <time className='created' sx={{ color: `textMuted` }}>
      {date}
    </time>

    <Styled.h4 sx={{ mt: 1 }}>{title}</Styled.h4>

    <div sx={{ display: `flex`, flexGrow: 1, mt: 0, mb: 1 }}>
      <span>
        {excerpt} <em>Read more &raquo;</em>
      </span>

      {banner && (
        <img
          alt='post thumbnail'
          src={banner}
          sx={{ borderRadius: `4px`, ml: 2 }}
        />
      )}
    </div>
  </Link>
)
