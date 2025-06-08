/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import SoundCloud from '../shortcodes/soundcloud'

const AudioPlayer = ({ soundcloudId, isVisible }) => {
  if (!isVisible || !soundcloudId) return null

  return (
    <div
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'panel-background',
        padding: 2,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div sx={{ maxWidth: '800px', width: '100%' }}>
        <SoundCloud soundcloudId={soundcloudId} />
      </div>
    </div>
  )
}

export default AudioPlayer
