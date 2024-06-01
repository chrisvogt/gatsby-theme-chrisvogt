/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Card } from '@theme-ui/components'
import { Link } from 'gatsby'

export default ({ banner, category, date, link, title }) => {
  return (
    <Link
      sx={{
        color: `var(--theme-ui-colors-panel-text)`,
        textDecoration: `none`
      }}
      to={link}
    >
      <Card variant='PostCard'>
        <div
          className='card-content'
          sx={{
            display: `flex`,
            flexDirection: `column`
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
                  height: `240px`,
                  transition: `all 2.5s ease`
                }}
              />
            </div>
          )}

          {category && <span sx={{ variant: `text.title`, mt: 1, fontSize: [1] }}>{category}</span>}

          <Themed.h4 sx={{ mt: 2, fontFamily: 'serif' }}>{title}</Themed.h4>

          <time
            className='created'
            sx={{
              color: `textMuted`,
              fontFamily: `sans`,
              fontSize: 1
            }}
          >
            {date}
          </time>
        </div>
      </Card>
    </Link>
  )
}
