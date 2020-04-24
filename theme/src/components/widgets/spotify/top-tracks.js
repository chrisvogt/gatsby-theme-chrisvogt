/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Heading } from '@theme-ui/components'

import TrackPreview from './track-preview'

const TopTracks = ({ isLoading, tracks }) => (
  <div className='gallery'>
    {isLoading ? (
      <span>Loading...</span>
    ) : (
      <Fragment>
        <Heading
          as='h3'
          sx={{
            marginBottom: '1rem'
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
          {tracks.map(track => {
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
      </Fragment>
    )}
  </div>
)

export default TopTracks
