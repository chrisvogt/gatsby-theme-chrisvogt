/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import { RectShape } from 'react-placeholder/lib/placeholders'

import TrackPreview from './track-preview'

const TopTracks = ({ isLoading, tracks }) => (
  <div className='gallery'>
    <Heading
      as='h3'
      sx={{
        mb: 3
      }}
    >
      Top Tracks
    </Heading>
    <div
      sx={{
        display: `grid`,
        gridGap: [3, 2, 2, 3],
        gridTemplateColumns: [`repeat(4, 1fr)`, `repeat(6, 1fr)`]
      }}
    >
      {isLoading &&
        Array(12)
          .fill()
          .map(item => {
            return (
              <RectShape
                color='#efefef'
                sx={{ boxShadow: `md`, width: `100%`, paddingBottom: `100%` }}
              />
            )
          })}
      {!isLoading &&
        tracks.map(track => {
          const { albumImages = [], id, name, spotifyURL } = track
          const thumbnailURL = albumImages.find(image => image.width === 300)
            .url
          return (
            <TrackPreview
              key={id}
              link={spotifyURL}
              name={name}
              thumbnailURL={thumbnailURL}
            />
          )
        })}
    </div>
  </div>
)

export default TopTracks
