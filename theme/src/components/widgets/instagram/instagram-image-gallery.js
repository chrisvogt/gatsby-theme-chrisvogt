/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'
import ReactPlaceholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'

import WidgetItem from './instagram-widget-item'

const MAX_IMAGES = 4

const ItemPlaceholder = (
  <div className='image-placeholder'>
    <RectShape
      color='#efefef'
      sx={{ boxShadow: `md`, width: `100%`, minHeight: `330px` }}
    />
  </div>
)

const InstagramImageGallery = ({
  onPostClick,
  onPostClose,
  isLoading,
  posts
}) => {
  return (
    <div className='gallery'>
      <Grid
        sx={{
          gridGap: [3, 3, 3, 4],
          gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)']
        }}
      >
        {(isLoading ? Array(MAX_IMAGES).fill() : posts)
          .slice(0, MAX_IMAGES)
          .map(post => (
            <ReactPlaceholder
              customPlaceholder={ItemPlaceholder}
              showLoadingAnimation
              ready={!isLoading}
              type='rect'
            >
              <WidgetItem post={post} onClick={onPostClick} />
            </ReactPlaceholder>
          ))}
      </Grid>
    </div>
  )
}

export default InstagramImageGallery
