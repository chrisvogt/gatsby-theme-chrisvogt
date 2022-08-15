/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'

import MediaItemGrid from './media-item-grid'

const TopTracks = ({ isLoading, tracks = [] }) => {
  const items = tracks.map(track => {
    const { artists = [], albumImages = [], id, name, spotifyURL } = track

    const { url: thumbnailURL } = albumImages.find(image => image.width === 300)

    const tooltipContent = (
      <article>
        <header>{name}</header>
        <span sx={{ fontStyle: `italic` }}>{artists.join(', ')}</span>
      </article>
    )

    return {
      id,
      name,
      spotifyURL,
      thumbnailURL,
      tooltipContent
    }
  })

  return (
    <div>
      <div sx={{ display: `flex`, flex: 1, alignItems: `center` }}>
        <Heading as='h3'>Top Tracks</Heading>
      </div>

      <p>My 12 most-played tracks over the last 4 weeks.</p>

      <MediaItemGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default TopTracks
