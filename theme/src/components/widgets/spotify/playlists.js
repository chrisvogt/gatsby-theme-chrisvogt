/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import MediaItemGrid from './media-item-grid'
import { floatOnHover } from '../../../gatsby-plugin-theme-ui/abstracts/shadows'
import Tooltip from '../../tooltip'
import { useState } from 'react'

const Playlists = ({ isLoading, playlists = [] }) => {
  const [activeMediaId, setActiveMediaId] = useState()

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
    
    return {
      id,
      name,
      spotifyURL,
      thumbnailURL,
      totalTracksCount
    }
  })

  return (
    <div sx={{ mb: 4 }}>
      <div sx={{ display: `flex`, flex: 1, alignItems: `center` }}>
        <Heading as='h3'>Playlists</Heading>
      </div>

      <p>My 12 favorite playlists.</p>

      <MediaItemGrid>
        {items.length > 0 && items.map(({
          id,
          name,
          spotifyURL,
          thumbnailURL,
          totalTracksCount
        }) => {
          return (
            <Themed.a
              className={`media-item_media${activeMediaId === id ? ' media-item--focused' : ''}`}
              href={spotifyURL}
              onMouseEnter={() => setActiveMediaId(id)}
              onMouseLeave={() => setActiveMediaId(false)}
            >
              <div className='media-item-wrapper'>
                <div className='media-item-aside'>
                  <img
                    alt='media-item-artwork cover artwork'
                    crossOrigin='anonymous'
                    src={thumbnailURL}
                    sx={{
                      ...floatOnHover,
                      boxShadow: `md`,
                      borderRadius: `4px`,
                      objectFit: 'cover',
                      width: '50px'
                    }}
                  />
                </div>
                <div className='media-item-body'>
                  <header>{name}</header>
                  <span sx={{ fontStyle: `italic` }}>{totalTracksCount} tracks</span>
                </div>
              </div>
            </Themed.a>
          )
        })}
      </MediaItemGrid>
    </div>
  )
}

export default Playlists
