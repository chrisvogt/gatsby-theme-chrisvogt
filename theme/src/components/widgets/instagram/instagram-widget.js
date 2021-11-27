/** @jsx jsx */
import { Grid } from '@theme-ui/components'
import { jsx } from 'theme-ui'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import get from 'lodash/get'
import ReactPlaceholder from 'react-placeholder'

import fetchDataSource from '../../../actions/fetchDataSource'
import {
  getInstagramUsername,
  getInstagramWidgetDataSource
} from '../../../selectors/metadata'
import selectMetricsPayload from '../../../selectors/selectMetricsPayload'
import { SUCCESS, FAILURE } from '../../../reducers/widgets'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'
import WidgetItem from './instagram-widget-item'

const MAX_IMAGES = 8

export default () => {
  const dispatch = useDispatch()

  const metadata = useSiteMetadata()
  const instagramUsername = getInstagramUsername(metadata)
  const instagramDataSource = getInstagramWidgetDataSource(metadata)

  useEffect(() => {
    dispatch(
      fetchDataSource('instagram', instagramDataSource, selectMetricsPayload)
    )
  }, [dispatch, instagramDataSource])

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  console.log('Rendering Instagram widget')

  const { hasFatalError, isLoading, media, metrics } = useSelector(state => {
    console.log('useSelector() – logging state', state)
    return {
      hasFatalError: get(state, 'widgets.instagram.state') === FAILURE,
      isLoading: get(state, 'widgets.instagram.state') !== SUCCESS,
      media: get(state, 'widgets.instagram.data.collections.media', []),
      metrics: get(state, 'widgets.instagram.data.metrics', [])
    };
  })

  console.log({
    hasFatalError,
    isLoading,
    media,
    metrics
  })

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

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

  return (
    <Widget id='instagram' hasFatalError={hasFatalError}>
      <WidgetHeader aside={callToAction}>Instagram</WidgetHeader>

      <ProfileMetricsBadge metrics={metrics} isLoading={isLoading} />

      <div className='gallery'>
        <Grid
          sx={{
            gridGap: [3, 3, 3, 4],
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)']
          }}
        >
          {(isLoading ? Array(MAX_IMAGES).fill({}) : media)
            .slice(0, MAX_IMAGES)
            .map((post, idx) => (
              <ReactPlaceholder
                customPlaceholder={
                  <div className='image-placeholder'>
                    <RectShape
                      color='#efefef'
                      sx={{
                        borderRadius: `4px`,
                        boxShadow: `md`,
                        width: `100%`,
                        paddingBottom: `100%`
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
                  handleClick={openLightbox}
                  index={idx}
                  post={post}
                />
              </ReactPlaceholder>
            ))}
        </Grid>
      </div>

      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            {!isLoading && (
              <Carousel
                currentIndex={currentImage}
                styles={{
                  // NOTE(cvogt): these styles were copy + pasted from craigrich/ruff-guide
                  // as a temporary fix for the `autoSize` feature not working as intended.
                  container: base => ({
                    ...base,
                    height: '100vh'
                  }),
                  view: base => ({
                    ...base,
                    alignItems: 'center',
                    display: 'flex ',
                    height: 'calc(100vh - 54px)',
                    justifyContent: 'center',
                    '& > img': {
                      maxHeight: 'calc(100vh - 94px)'
                    }
                  })
                }}
                views={media.map(x => ({
                  ...x,
                  source: {
                    download: `${x.cdnMediaURL}?auto=format`,
                    fullscreen: `${x.cdnMediaURL}?auto=format`,
                    regular: `${x.cdnMediaURL}?auto=format`,
                    thumbnail: `${x.cdnMediaURL}?h=280&w=280&fit=crop&crop=faces,focalpoint&auto=format`
                  }
                }))}
              />
            )}
          </Modal>
        )}
      </ModalGateway>
    </Widget>
  )
}
