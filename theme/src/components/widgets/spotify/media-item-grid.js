/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import Placeholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { useState } from 'react'

import { floatOnHover } from '../../../gatsby-plugin-theme-ui/theme'

const placeholders = Array(12)
  .fill()
  .map((item, idx) => (
    <div className='show-loading-animation' key={idx}>
      <RectShape
        color='#efefef'
        sx={{
          borderRadius: '6px',
          boxShadow: 'md',
          paddingBottom: '100%',
          width: '100%'
        }}
        showLoadingAnimation
      />
    </div>
  ))

const MediaItemGrid = ({ isLoading, items = [] }) => {
  const [currentMediaId, setCurrentMediaId] = useState(false)
  return (
    <div
      className={`media-item_grid ${currentMediaId ? 'media-item_grid--interacting' : null}`}
      sx={{
        display: 'grid',
        gridGap: [3, 2, 2, 3],
        gridTemplateColumns: ['repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)', 'repeat(6, 1fr)']
      }}
    >
      <Placeholder ready={!isLoading} customPlaceholder={placeholders}>
        {items.map(({ id, details, spotifyURL, thumbnailURL }) => {
          return (
            <Themed.a
              className={`media-item_media${currentMediaId === id ? ' media-item--focused' : ''}`}
              href={spotifyURL}
              key={id}
              onMouseEnter={() => setCurrentMediaId(id)}
              onMouseLeave={() => setCurrentMediaId(false)}
              title={details}
            >
              <Themed.img
                alt='cover artwork'
                crossOrigin='anonymous'
                loading='lazy'
                src={thumbnailURL}
                sx={{
                  ...floatOnHover,
                  boxShadow: 'md',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  width: '100%'
                }}
              />
            </Themed.a>
          )
        })}
      </Placeholder>
    </div>
  )
}

export default MediaItemGrid
