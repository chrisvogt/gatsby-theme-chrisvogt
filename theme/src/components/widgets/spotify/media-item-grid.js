/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'
import Placeholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { useState } from 'react'

import { DEFAULT_BORDER_RADIUS_WIDTH } from '../../../gatsby-plugin-theme-ui/styles'
import { floatOnHover } from '../../../gatsby-plugin-theme-ui/abstracts/shadows'
import Tooltip from '../../tooltip'

const placeholders = Array(12)
  .fill()
  .map((item, idx) => (
    <div className='show-loading-animation' key={idx}>
      <RectShape
        color='#efefef'
        sx={{
          borderRadius: `6px`,
          boxShadow: `md`,
          paddingBottom: `100%`,
          width: `100%`
        }}
        showLoadingAnimation
      />
    </div>
  ))

const MediaItemGrid = ({ isLoading, items = [] }) => {
  const [currentMediaId, setCurrentMediaId] = useState(false)
  return (
    <div
      className={`media-item_grid ${!!currentMediaId ? 'media-item_grid--interacting' : null}`}
      sx={{
        display: `grid`,
        gridGap: [3, 2, 2, 3],
        gridTemplateColumns: [`repeat(4, 1fr)`, `repeat(6, 1fr)`]
      }}
    >
      <Placeholder ready={!isLoading} customPlaceholder={placeholders}>
        {items.map(({ id, spotifyURL, thumbnailURL, tooltipContent }) => {
          return (
            <Tooltip key={id} placement='top' tooltip={tooltipContent} trigger={['hover', 'focus']}>
              <Themed.a
                className={`media-item_media${currentMediaId === id ? ' media-item--focused' : ''}`}
                href={spotifyURL}
                onMouseEnter={() => setCurrentMediaId(id)}
                onMouseLeave={() => setCurrentMediaId(false)}
              >
                <img
                  alt='cover artwork'
                  crossOrigin='anonymous'
                  loading='lazy'
                  src={thumbnailURL}
                  sx={{
                    ...floatOnHover,
                    boxShadow: `md`,
                    borderRadius: DEFAULT_BORDER_RADIUS_WIDTH,
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
              </Themed.a>
            </Tooltip>
          )
        })}
      </Placeholder>
    </div>
  )
}

export default MediaItemGrid
