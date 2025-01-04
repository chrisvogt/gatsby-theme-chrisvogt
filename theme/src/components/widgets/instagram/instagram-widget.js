/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Grid } from '@theme-ui/components'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { useCallback, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'
import LightGallery from 'lightgallery/react'
import ReactPlaceholder from 'react-placeholder'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-video.css'
import 'lightgallery/css/lg-autoplay.css'

import fetchDataSource from '../../../actions/fetchDataSource'
import { getInstagramUsername, getInstagramWidgetDataSource } from '../../../selectors/metadata'
import { SUCCESS, FAILURE, getInstagramWidget } from '../../../reducers/widgets'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import Button from '../../button'
import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'
import WidgetItem from './instagram-widget-item'

const MAX_IMAGES = {
  default: 8,
  showMore: 16
}

const getHasFatalError = state => getInstagramWidget(state).state === FAILURE
const getIsLoading = state => getInstagramWidget(state).state !== SUCCESS
const getMedia = state => getInstagramWidget(state).data?.collections?.media || []
const getMetrics = state => getInstagramWidget(state).data?.metrics || []

export default () => {
  const dispatch = useDispatch()

  const metadata = useSiteMetadata()
  const instagramUsername = getInstagramUsername(metadata)
  const instagramDataSource = getInstagramWidgetDataSource(metadata)

  const hasFatalError = useSelector(getHasFatalError)
  const isLoading = useSelector(getIsLoading)
  const media = useSelector(getMedia)
  const metrics = useSelector(getMetrics)

  const [focusedItem, setFocusedItem] = useState(null)
  const [isShowingMore, setIsShowingMore] = useState(false)

  const lightGalleryRef = useRef(null)

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchDataSource('instagram', instagramDataSource))
    }
  }, [dispatch, instagramDataSource, isLoading])

  const openLightbox = useCallback(
    index => {
      const instance = lightGalleryRef.current
      if (instance) {
        instance.openGallery(index)
      } else {
        console.error('LightGallery instance is not initialized')
      }
    },
    [lightGalleryRef]
  )

  const callToAction = (
    <CallToAction
      title={`${instagramUsername} on Instagram`}
      url={`https://www.instagram.com/${instagramUsername}`}
      isLoading={isLoading}
    >
      Visit Profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  const countItemsToRender = isShowingMore ? MAX_IMAGES.showMore : MAX_IMAGES.default

  return (
    <Widget id='instagram' hasFatalError={hasFatalError}>
      <WidgetHeader aside={callToAction}>Instagram</WidgetHeader>

      <ProfileMetricsBadge metrics={metrics} isLoading={isLoading} />

      <div className='gallery'>
        <Grid
          className={classnames('media-item_grid', { 'media-item_grid--interacting': Boolean(focusedItem) })}
          sx={{
            gridGap: [3, 3, 3, 4],
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)', '', 'repeat(4, 1fr)']
          }}
        >
          {(isLoading ? Array(countItemsToRender).fill({}) : media).slice(0, countItemsToRender).map((post, idx) => (
            <ReactPlaceholder
              customPlaceholder={
                <div className='image-placeholder'>
                  <RectShape
                    color='#efefef'
                    sx={{
                      borderRadius: '8px',
                      boxShadow: 'md',
                      width: '100%',
                      paddingBottom: '100%'
                    }}
                  />
                </div>
              }
              key={isLoading ? idx : post.id}
              ready={!isLoading}
              showLoadingAnimation
              type='rect'
            >
              <WidgetItem
                isFocusedItem={focusedItem === post.id}
                handleClick={() => openLightbox(idx)}
                index={idx}
                post={post}
                onFocus={() => setFocusedItem(post.id)}
                onBlur={() => setFocusedItem(null)}
                onMouseEnter={() => setFocusedItem(post.id)}
                onMouseLeave={() => setFocusedItem(null)}
              />
            </ReactPlaceholder>
          ))}
        </Grid>
      </div>

      {!isLoading && (
        <div sx={{ my: 4, textAlign: 'center' }}>
          <Button onClick={() => setIsShowingMore(!isShowingMore)}>{isShowingMore ? 'Show Less' : 'Show More'}</Button>
        </div>
      )}

      <LightGallery
        onInit={ref => {
          lightGalleryRef.current = ref.instance
        }}
        plugins={[lgThumbnail, lgZoom, lgVideo, lgAutoplay]}
        licenseKey={process.env.GATSBY_LIGHT_GALLERY_LICENSE_KEY}
        download={false}
        dynamic
        dynamicEl={media.map(post => ({
          thumb: post.cdnMediaURL,
          subHtml: post.caption || '',
          ...(post.mediaType !== 'VIDEO' ? { src: post.cdnMediaURL } : {}),
          video:
            post.mediaType === 'VIDEO' && post.mediaURL
              ? {
                  source: [
                    {
                      src: post.mediaURL,
                      type: 'video/mp4'
                    }
                  ],
                  attributes: {
                    controls: true // Enable controls for the video
                  }
                }
              : undefined
        }))}
        autoplayVideoOnSlide={true} // Add this option
        speed={500}
      />
    </Widget>
  )
}
