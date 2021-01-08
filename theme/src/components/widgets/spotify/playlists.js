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
      name
    } = item

    const { url: thumbnailURL } = images.find(
        // Spotify provides playlist cover mosaic images at 60, 300 and 640px. 
        image => image.width === 300
      ) || images.find(
        // If no mosaic cover image was found, select the first available image.
        image => image.url
      )
    
    return {
      id,
      name,
      spotifyURL,
      thumbnailURL
    }
  })

  return (
    <div sx={{ mb: 4 }}>
      <Heading as='h3'>Playlists</Heading>
      <p>My 12 favorite playlists.</p>
      <MediaItemGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default Playlists
