/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'

import {
  getInstagramUsername,
  getInstagramWidgetDataSource
} from '../../../selectors/metadata'
import useSiteMetadata from '../../../hooks/use-site-metadata'
import useDataSource from '../../../hooks/use-data-source'

import CallToAction from '../call-to-action'
import InstagramImageGallery from './instagram-image-gallery'
import InstagramPostPreview from './instagram-post-preview'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

export default () => {
  const metadata = useSiteMetadata()

  const instagramUsername = getInstagramUsername(metadata)
  const instagramDataSource = getInstagramWidgetDataSource(metadata)

  const { isLoading, data = {} } = useDataSource(instagramDataSource)
  const { collections: { media: posts } = {} } = data

  const [selectedPost, setSelectedPost] = useState(null)

  const handlePostClick = post => {
    console.log(`setting selected post`, post)
    setSelectedPost(post)
  }

  const handlePostClose = () => {
    console.log('Closing preview')
    setSelectedPost(null)
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
      {selectedPost ? (
        <InstagramPostPreview
          post={selectedPost}
          onPostClose={handlePostClose}
        />
      ) : (
        <InstagramImageGallery
          onPostClick={handlePostClick}
          isLoading={isLoading}
          posts={posts}
        />
      )}
    </Widget>
  )
}
