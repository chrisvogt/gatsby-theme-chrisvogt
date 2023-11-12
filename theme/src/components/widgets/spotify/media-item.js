/** @jsx jsx */
import React from 'react'
import { Themed } from '@theme-ui/mdx'

import { floatOnHover } from '../../../gatsby-plugin-theme-ui/theme'
import 'react-popper-tooltip/dist/styles.css'

const MediaItem = () => {
  return (
    <Themed.div
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <Themed.a
        className={`media-item_media${currentMediaId === id ? ' media-item--focused' : ''}`}
        href={spotifyURL}
        onMouseEnter={() => setCurrentMediaId(id)}
        onMouseLeave={() => setCurrentMediaId(false)}
        title={ details }
      >
        <Themed.img
          alt='cover artwork'
          crossOrigin='anonymous'
          loading='lazy'
          src={thumbnailURL}
          sx={{
            ...floatOnHover,
            boxShadow: `md`,
            borderRadius: `8px`,
            objectFit: 'cover',
            width: '100%'
          }}
        />
      </Themed.a>
      {visible && (
        <Themed.div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
          sx={{
            border: theme => (isDarkMode ? `none` : theme.colors.gray[8]),
            ...(isDarkMode ? { color: `text` } : {})
          }}
        >
          {!hideArrow && <div {...getArrowProps({ className: 'tooltip-arrow' })} />}
          {tooltip}
        </Themed.div>
      )}
    </Themed.div>
  )
}

export default MediaItem
