/** @jsx jsx */
import { createContext, useContext, useRef, useState } from 'react'
import { jsx } from 'theme-ui'
import LightGallery from 'lightgallery/react'
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-video.css'
import 'lightgallery/css/lg-autoplay.css'

const LightboxContext = createContext(null)

export const useLightbox = () => {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}

export const LightboxProvider = ({ children, items = [] }) => {
  const lightGalleryRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const openGallery = index => {
    if (!isInitialized) {
      console.warn('LightGallery is not yet initialized')
      return
    }

    const instance = lightGalleryRef.current
    if (!instance) {
      console.error('LightGallery instance is not available')
      return
    }

    if (index < 0 || index >= items.length) {
      console.error(`Invalid lightbox index: ${index}`)
      return
    }

    try {
      instance.instance.openGallery(index)
    } catch (error) {
      console.error('Error opening lightbox:', error)
    }
  }

  return (
    <LightboxContext.Provider value={{ openGallery, isInitialized }}>
      {children}
      <LightGallery
        onInit={ref => {
          lightGalleryRef.current = ref
          setIsInitialized(true)
        }}
        onCloseAfter={() => {
          // Optional: Add any cleanup needed after closing
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgAutoplay, lgVideo]}
        elementClassNames='lightgallery'
        download={false}
        counter={false}
        items={items}
        licenseKey={process.env.GATSBY_LIGHT_GALLERY_LICENSE_KEY}
      />
    </LightboxContext.Provider>
  )
}
