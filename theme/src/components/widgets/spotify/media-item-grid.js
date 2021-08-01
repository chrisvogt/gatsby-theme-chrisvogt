/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'
import Placeholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { useState } from 'react'

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

const MediaItemGrid = ({ activeMediaId, children }) => {
  return (
    <div
      className={`media-item_grid ${!!activeMediaId ? 'media-item_grid--interacting' : null}`}
      sx={{
        display: `grid`,
        gridGap: [3, 2, 2, 3],
        gridTemplateColumns: [`1fr`, `repeat(2, 1fr)`, `repeat(3, 1fr)`]
      }}
    >
      {children}
    </div>
  )
}

export default MediaItemGrid
