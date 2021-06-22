/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import MediaItemGrid from './media-item-grid'

const Playlists = ({ isLoading, playlists = [] }) => {
  const items = playlists.map(item => {
    const {
      external_urls: {
        spotify: spotifyURL
      } = {},
      id,
      images = [],
      name,
      tracks: {
        total: totalTracksCount = 0
      } = {}
    } = item

    const { url: thumbnailURL } = images.find(
        // Spotify provides playlist cover mosaic images at 60, 300 and 640px. 
        image => image.width === 300
      ) || images.find(
        // If no mosaic cover image was found, select the first available image.
        image => image.url
      ) || {}
    
    const tooltipContent = (
      <article>
        <header>{name}</header>
        <span sx={{ fontStyle: `italic` }}>{totalTracksCount} tracks</span>
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
    <div sx={{ mb: 4 }}>
      <div sx={{ display: `flex`, flex: 1, alignItems: `center` }}>
        <Heading as='h3'>Playlists</Heading>
      </div>

      <p>My 12 favorite playlists.</p>

      <MediaItemGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default Playlists
