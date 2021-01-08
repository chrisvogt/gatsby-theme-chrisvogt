/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { useState } from 'react'
import { Heading } from '@theme-ui/components'

import MediaItemGrid from './media-item-grid'
import TopTracksList from './top-tracks-list'

const TopTracks = ({ isLoading, tracks = [] }) => {
  const [renderAsGrid, setRenderAsGrid] = useState(true)
  const Component = renderAsGrid ? MediaItemGrid : TopTracksList

  const items = tracks.map(track => {
    const { albumImages = [], id, name, spotifyURL } = track
    const { url: thumbnailURL } = albumImages.find(
      image => image.width === 300
    )
    return {
      id,
      name,
      spotifyURL,
      thumbnailURL
    }
  })

  return (
    <div>
      <div sx={{ display: `flex`, flex: 1, alignItems: `center` }}>
        <Heading as='h3'>Top Tracks</Heading>
        {/* <div
          sx={{
            display: `flex`,
            flex: 1,
            alignItems: `center`,
            justifyContent: `flex-end`
          }}
        >
          <span sx={{ mr: 2 }}>View as</span>
          <Button
            variant={renderAsGrid ? 'disabled' : '3D'}
            mr={2}
            onClick={() => setRenderAsGrid(true)}
            sx={{ py: 0, px: 2 }}
          >
            Grid
          </Button>
          <Button
            variant={!renderAsGrid ? 'disabled' : '3D'}
            onClick={() => setRenderAsGrid(false)}
            sx={{ py: 0, px: 2 }}
          >
            List
          </Button>
        </div> */}
      </div>

      <p>My 12 most-played tracks over the last 4 weeks.</p>

      <Component isLoading={isLoading} items={items} />
    </div>
  )
}

export default TopTracks
