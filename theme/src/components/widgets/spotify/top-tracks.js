/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import { RectShape } from 'react-placeholder/lib/placeholders'
import Placeholder from 'react-placeholder'

import TrackPreview from './track-preview'

const placeholders = Array(12)
  .fill()
  .map(() => (
    <div className='show-loading-animation'>
      <RectShape
        color='#efefef'
        sx={{
          borderRadius: `6px`,
          boxShadow: `md`,
          paddingBottom: `100%`,
          width: `100%`
        }}
        showLoadingAnimation
      />
    </div>
  ))

const TopTracks = ({ isLoading, tracks = [] }) => (
  <div className='gallery'>
    <Heading as='h3'>Top Tracks</Heading>

    <p>My most-played tracks over the last 4 weeks.</p>

    <div
      sx={{
        display: `grid`,
        gridGap: [3, 2, 2, 3],
        gridTemplateColumns: [`repeat(4, 1fr)`, `repeat(6, 1fr)`]
      }}
    >
      <Placeholder ready={!isLoading} customPlaceholder={placeholders}>
        {tracks.map(track => {
          const { albumImages = [], id, name, spotifyURL } = track
          const { url: thumbnailURL } = albumImages.find(
            image => image.width === 300
          )

          return (
            <TrackPreview
              key={id}
              link={spotifyURL}
              name={name}
              thumbnailURL={thumbnailURL}
            />
          )
        })}
      </Placeholder>
    </div>
  </div>
)

export default TopTracks
