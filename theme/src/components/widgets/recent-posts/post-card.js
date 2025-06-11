/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import { Card } from '@theme-ui/components'
import { Link } from 'gatsby'
import Category from '../../category'

export default ({ banner, category, date, excerpt, link, title }) => {
  return (
    <Link
      sx={{
        color: 'var(--theme-ui-colors-panel-text)',
        textDecoration: 'none'
      }}
      to={link}
    >
      <Card
        variant='PostCard'
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)'
          }
        }}
      >
        <div
          className='card-content'
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {banner && (
            <div className='card-media'>
              <div
                sx={{
                  backgroundImage: `url(${banner})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '8px',
                  width: '100%',
                  aspectRatio: '1.9 / 1',
                  transition: 'all 2.5s ease'
                }}
              />
            </div>
          )}

          {category && <Category type={category} sx={{ mt: 1 }} />}

          <Themed.h3 sx={{ mt: 2, fontFamily: 'serif' }}>{title}</Themed.h3>

          <time
            className='created'
            sx={{
              color: 'textMuted',
              fontFamily: 'sans',
              fontSize: 1
            }}
          >
            {date}
          </time>

          {excerpt && (
            <Themed.p
              className='description'
              sx={{
                mt: 2,
                mb: 0,
                fontSize: 1
              }}
            >
              {excerpt}
            </Themed.p>
          )}
        </div>
      </Card>
    </Link>
  )
}
