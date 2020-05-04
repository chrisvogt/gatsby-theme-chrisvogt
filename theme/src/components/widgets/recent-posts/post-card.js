/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

export default ({ banner, category, date, excerpt, link, title }) => (
  <Link sx={{ variant: `styles.PostCard` }} to={link}>
    <div
      className='card-content'
      sx={{
        display: `flex`,
        flexDirection: `column`,
        height: `100%`
      }}
    >
      {banner && (
        <div className='card-media'>
          <div
            sx={{
              backgroundImage: `url(${banner})`,
              backgroundPosition: `center`,
              backgroundSize: `cover`,
              borderRadius: `1px`,
              height: `240px`
            }}
          />
        </div>
      )}

      {category && (
        <span sx={{ variant: `text.title`, mt: 1 }}>{category}</span>
      )}

      <Styled.h4 sx={{ height: `100%`, mt: 2 }}>{title}</Styled.h4>

      <time
        className='created'
        sx={{
          color: `textMuted`,
          fontSize: 0
        }}
      >
        {date}
      </time>
    </div>
  </Link>
)
