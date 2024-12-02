/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import { Themed } from '@theme-ui/mdx'

import MediaItemGrid from './media-item-grid'

const TopTracks = ({ isLoading, tracks = [] }) => {
  const items = tracks.map(track => {
    const { artists = [], albumImages = [], id, name, spotifyURL } = track

    const { url: thumbnailURL } = albumImages.find(image => image.width === 300)

    return {
      id,
      name,
      spotifyURL,
      thumbnailURL,
      details: `${name} – ${artists.join(', ')}`
    }
  })

  return (
    <div>
      <div sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <Heading as='h3' sx={{ fontSize: [3, 4] }}>
          Top Tracks
        </Heading>
      </div>

      <Themed.p>My 12 most-played tracks over the last 4 weeks.</Themed.p>

      <MediaItemGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default TopTracks
