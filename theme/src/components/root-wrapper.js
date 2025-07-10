/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useSelector } from 'react-redux'
import React from 'react'

import AudioPlayer from './audio-player'

const RootWrapper = ({ children }) => {
  const { soundcloudId, spotifyURL, isVisible, provider } = useSelector(state => state.audioPlayer)

  return (
    <>
      {children}
      <AudioPlayer soundcloudId={soundcloudId} spotifyURL={spotifyURL} isVisible={isVisible} provider={provider} />
    </>
  )
}

export default RootWrapper
