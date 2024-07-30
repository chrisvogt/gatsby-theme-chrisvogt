/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import MediaItemGrid from './media-item-grid'
import { Themed } from '@theme-ui/mdx'

const Playlists = ({ isLoading, playlists = [] }) => {
  const items = playlists.map(item => {
    const {
      external_urls: { spotify: spotifyURL } = {},
      id,
      images = [],
      name,
      tracks: { total: totalTracksCount = 0 } = {}
    } = item

    if (!totalTracksCount) {
      return null; // Fixes a bug discovered in Prod when an empty album was returned.
    }

    const { url: thumbnailURL } =
      images.find(
        // Spotify provides playlist cover mosaic images at 60, 300 and 640px.
        image => image.width === 300
      ) ||
      images.find(
        // If no mosaic cover image was found, select the first available image.
        image => image.url
      ) ||
      {}

    return {
      id,
      name,
      spotifyURL,
      thumbnailURL,
      details: `${name} (${totalTracksCount} tracks)`
    }
  }).filter(Boolean)

  return (
    <div sx={{ mb: 4 }}>
      <div sx={{ display: `flex`, flex: 1, alignItems: `center` }}>
        <Heading as='h3' sx={{ fontSize: [3, 4] }}>Playlists</Heading>
      </div>

      <Themed.p>My 12 favorite playlists.</Themed.p>

      <MediaItemGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default Playlists
