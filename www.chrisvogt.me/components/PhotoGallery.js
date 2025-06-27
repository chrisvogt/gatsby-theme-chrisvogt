/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useRef, useCallback } from 'react'

import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lightgallery.css'
import Gallery from 'react-photo-gallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import LightGallery from 'lightgallery/react'

export const PhotoGallery = ({ photos }) => {
  const lightGalleryRef = useRef(null)

  const openLightbox = useCallback((event, { index }) => {
    const instance = lightGalleryRef.current
    if (instance) {
      instance.openGallery(index)
    } else {
      console.error('LightGallery instance is not initialized')
    }
  }, [])

  return (
    <div sx={{ mb: 4 }}>
      {/* Render photo gallery */}
      <Gallery photos={photos} onClick={openLightbox} />

      {/* Initialize LightGallery */}
      <LightGallery
        onInit={ref => {
          lightGalleryRef.current = ref.instance
        }}
        plugins={[lgThumbnail, lgZoom]}
        download={false}
        dynamic
        dynamicEl={photos.map(photo => ({
          alt: photo.title,
          src: photo.src,
          thumb: photo.thumb || photo.src, // fallback to image src if thumb is not provided
          subHtml: photo.title || ''
        }))}
        speed={1000}
      />
    </div>
  )
}
