/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useSelector } from 'react-redux'
import React from 'react'

import AudioPlayer from './audio-player'

const RootWrapper = ({ children }) => {
  const { soundcloudId, isVisible } = useSelector(state => state.audioPlayer)

  return (
    <>
      {children}
      <AudioPlayer soundcloudId={soundcloudId} isVisible={isVisible} />
    </>
  )
}

export default RootWrapper
