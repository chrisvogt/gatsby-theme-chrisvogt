/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SoundCloud from '../shortcodes/soundcloud'

const AudioPlayer = ({ soundcloudId, isVisible }) => {
  const containerRef = useRef(null)
  const widgetRef = useRef(null)

  // Create portal container on mount
  useEffect(() => {
    if (!containerRef.current) {
      containerRef.current = document.createElement('div')
      containerRef.current.id = 'audio-player-portal'
      document.body.appendChild(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current)
        containerRef.current = null
      }
    }
  }, [])

  // Preserve widget instance
  useEffect(() => {
    if (soundcloudId && !widgetRef.current) {
      widgetRef.current = soundcloudId
    }
  }, [soundcloudId])

  if (!isVisible || !soundcloudId || !containerRef.current) return null

  return createPortal(
    <div
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'panel-background',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', // for Safari
        pt: 3,
        pb: 2,
        px: 3,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        sx={{
          width: '100%',
          maxWidth: [
            '100%', // mobile: full width
            '100%', // tablet: full width
            '1200px', // desktop: max-width
            '1400px' // large desktop: slightly wider
          ],
          '& iframe': {
            width: '100% !important',
            height: '100px !important', // fixed compact height
            maxHeight: '100px !important'
          }
        }}
      >
        <SoundCloud soundcloudId={widgetRef.current || soundcloudId} />
      </div>
    </div>,
    containerRef.current
  )
}

export default AudioPlayer
