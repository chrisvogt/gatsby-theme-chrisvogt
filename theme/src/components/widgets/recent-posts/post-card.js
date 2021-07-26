/** @jsx jsx */
import { jsx, Themed, useThemeUI } from 'theme-ui'
import { Card } from '@theme-ui/components'
import { Link } from 'gatsby'

import isDarkMode from '../../../helpers/isDarkMode'

export default ({ banner, category, date, link, title }) => {
  const { colorMode } = useThemeUI()
  const variant = isDarkMode(colorMode) ? 'PostCardDark' : 'PostCard'

  return (
    <Link sx={{ variant: 'styles.PostCardLink' }} to={link}>
      <Card variant={variant}>
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

          {category && (
            <span sx={{ variant: `text.title`, mt: 1 }}>{category}</span>
          )}

          <Themed.h4 sx={{ mt: 2 }}>{title}</Themed.h4>

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
      </Card>
    </Link>
  )
}
