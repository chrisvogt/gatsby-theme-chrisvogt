/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import MediaItemGrid from './media-item-grid'
import { Themed } from '@theme-ui/mdx'

const Playlists = ({ isLoading, playlists = [] }) => {
  const items = playlists
    .map(item => {
      if (!item) {
        // Added 11/28/24 to fix a bug where an empty playlist was being returned
        return
      }

      const {
        external_urls: { spotify: spotifyURL } = {},
        id,
        images = [],
        name,
        tracks: { total: totalTracksCount = 0 } = {}
      } = item

      // Skip playlist for the following reasons:
      // undefined totalTracksCount: Fixes a bug discovered in Prod when an empty album was returned.
      // undefined images: Fixes a bug and since these playlists are image-centric, we don't want to render them without an image.
      if (!(totalTracksCount && images.length)) {
        return null
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
    })
    .filter(Boolean)
    .slice(0, 12) // Limit to 12 playlists for now. As of December 2024 the API response includes > 12 playlists.

  return (
    <div>
      <div sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <Heading as='h3' sx={{ fontSize: [3, 4] }}>
          Playlists
        </Heading>
      </div>

      <Themed.p>My 12 favorite playlists.</Themed.p>

      <MediaItemGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default Playlists
