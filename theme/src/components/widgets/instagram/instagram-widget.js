/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'
import ReactPlaceholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { Bars } from 'svg-loaders-react'

import { getInstagramUsername } from '../../../selectors/metadata'
import useInstagramPosts from '../../../hooks/use-instagram-posts'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import Widget from '../widget'
import WidgetItem from './instagram-widget-item'
import WidgetHeader from '../widget-header'

const ItemPlaceholder = (
  <div className='image-placeholder'>
    <RectShape
      color='#efefef'
      sx={{ boxShadow: `md`, width: `100%`, minHeight: `330px` }}
    />
  </div>
)

export default () => {
  const { isLoading, posts } = useInstagramPosts()
  const metadata = useSiteMetadata()
  const instagramUsername = getInstagramUsername(metadata)

  const callToAction = isLoading ? (
    <Bars
      fill='#1E90FF'
      width='24'
      height='24'
      sx={{ verticalAlign: `middle` }}
    />
  ) : (
    <CallToAction
      title={`${instagramUsername} on Instagram`}
      url={`https://www.instagram.com/${instagramUsername}`}
    >
      View profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='instagram'>
      <WidgetHeader aside={callToAction}>Instagram</WidgetHeader>

      <div className='gallery'>
        <Grid
          sx={{
            gridGap: [3, 3, 3, 4],
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)']
          }}
        >
          {(isLoading ? Array(4).fill() : posts).slice(0, 4).map(post => (
            <ReactPlaceholder
              customPlaceholder={ItemPlaceholder}
              showLoadingAnimation
              ready={!isLoading}
              type='rect'
            >
              <WidgetItem post={post} />
            </ReactPlaceholder>
          ))}
        </Grid>
      </div>
    </Widget>
  )
}
