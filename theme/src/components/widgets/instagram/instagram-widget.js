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
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'
import WidgetItem from './instagram-widget-item'

const MAX_IMAGES = 8
const WIDGET_ID = 'instagram'

export default () => {
  const dispatch = useDispatch()
  const metadata = useSiteMetadata()
  const instagramUsername = getInstagramUsername(metadata)
  const instagramDataSource = getInstagramWidgetDataSource(metadata)

  useEffect(() => {
    dispatch(
      fetchDataSource(WIDGET_ID, instagramDataSource, selectMetricsPayload)
    )
  }, [dispatch, instagramDataSource])

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const { isLoading, media, metrics } = useSelector(state => ({
    isLoading: get(state, 'widgets.dataSources.instagram.state') !== 'SUCCESS',
    media: get(
      state,
      'widgets.dataSources.instagram.data.collections.media',
      []
    ),
    metrics: get(state, 'widgets.dataSources.instagram.data.metrics', [])
  }))

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
    <Widget id='instagram'>
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
                views={media.map(x => ({
                  ...x,
                  caption: x.caption,
                  src: `${x.cdnMediaURL}?auto=format`
                }))}
              />
            )}
          </Modal>
        )}
      </ModalGateway>
    </Widget>
  )
}
