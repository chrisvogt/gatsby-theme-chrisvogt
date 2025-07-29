/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import { Themed } from '@theme-ui/mdx'
import Placeholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { useState } from 'react'

// Vinyl collection component styles

const placeholders = Array(12)
  .fill()
  .map((item, idx) => (
    <div className='show-loading-animation' key={idx}>
      <RectShape
        color='#efefef'
        sx={{
          borderRadius: '50%',
          boxShadow: 'md',
          paddingBottom: '100%',
          width: '100%'
        }}
        showLoadingAnimation
      />
    </div>
  ))

const VinylCollection = ({ isLoading, releases = [] }) => {
  const [currentVinylId, setCurrentVinylId] = useState(false)

  const handleClick = (e, discogsURL) => {
    e.preventDefault()
    window.open(discogsURL, '_blank', 'noopener,noreferrer')
  }

  const vinylItems = releases.map(release => {
    const { id, basicInformation = {} } = release
    const { title, year, artists = [], cdnThumbUrl, resourceUrl } = basicInformation
    const artistName = artists.map(artist => artist.name).join(', ')
    const details = `${title} (${year}) - ${artistName}`

    return {
      id,
      title,
      year,
      artistName,
      cdnThumbUrl,
      resourceUrl,
      details
    }
  })

  return (
    <div sx={{ mb: 4 }}>
      <div sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <Heading as='h3' sx={{ fontSize: [3, 4] }}>
          Vinyl Collection
        </Heading>
      </div>

      <Themed.p>My owned vinyl records from Discogs.</Themed.p>

      <div
        className={`vinyl-collection_grid ${currentVinylId ? 'vinyl-collection_grid--interacting' : null}`}
        sx={{
          display: 'grid',
          gridGap: [3, 2, 2, 3],
          gridTemplateColumns: [
            'repeat(3, 1fr)',
            'repeat(4, 1fr)',
            'repeat(4, 1fr)',
            'repeat(5, 1fr)',
            'repeat(6, 1fr)'
          ]
        }}
      >
        <Placeholder ready={!isLoading} customPlaceholder={placeholders}>
          {vinylItems.map(({ id, title, year, artistName, cdnThumbUrl, resourceUrl, details }) => {
            return (
              <Themed.a
                className={`vinyl-record${currentVinylId === id ? ' vinyl-record--focused' : ''}`}
                href={resourceUrl}
                key={id}
                onClick={e => handleClick(e, resourceUrl)}
                onMouseEnter={() => setCurrentVinylId(id)}
                onMouseLeave={() => setCurrentVinylId(false)}
                title={details}
                sx={{
                  display: 'block',
                  position: 'relative',
                  height: '100%',
                  width: '100%',
                  transition: 'all 300ms ease-in-out',
                  transform: 'translateY(0) scale(1)',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: 'xl'
                  },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  aspectRatio: '1/1',
                  '&:hover .vinyl-record_caption': {
                    opacity: 1
                  },
                  '&:hover .vinyl-record_image': {
                    transform: 'rotate(180deg)'
                  }
                }}
              >
                <div
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
                    border: '2px solid #333'
                  }}
                >
                  {/* Vinyl record with album art */}
                  <div
                    className='vinyl-record_image'
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '50%',
                      transition: 'transform 0.5s ease-in-out',
                      background: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '20%',
                        height: '20%',
                        borderRadius: '50%',
                        background: '#000',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
                        zIndex: 3
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '50%',
                        background: `repeating-conic-gradient(
                          from 0deg,
                          transparent 0deg,
                          transparent 2deg,
                          rgba(255, 255, 255, 0.05) 2deg,
                          rgba(255, 255, 255, 0.05) 4deg
                        )`,
                        zIndex: 1
                      }
                    }}
                  >
                    {cdnThumbUrl && (
                      <Themed.img
                        alt={`${title} album cover`}
                        crossOrigin='anonymous'
                        loading='lazy'
                        src={cdnThumbUrl}
                        sx={{
                          width: '70%',
                          height: '70%',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          position: 'relative',
                          zIndex: 2,
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    )}
                  </div>

                  {/* Hover caption */}
                  <Themed.div
                    className='vinyl-record_caption'
                    sx={{
                      color: 'white',
                      fontSize: [0, 1, 1, 1],
                      fontWeight: 'bold',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'absolute',
                      textAlign: 'center',
                      padding: 2,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      background: 'rgba(0, 0, 0, 0.85)',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      borderRadius: '50%',
                      zIndex: 4
                    }}
                  >
                    <span sx={{ mb: 1, fontSize: [0, 1], lineHeight: 1.2 }}>{title}</span>
                    <span sx={{ fontSize: [0, 0, 1], opacity: 0.8, lineHeight: 1.1 }}>{artistName}</span>
                    <span sx={{ fontSize: [0, 0, 0], opacity: 0.6, mt: 1 }}>{year}</span>
                  </Themed.div>
                </div>
              </Themed.a>
            )
          })}
        </Placeholder>
      </div>
    </div>
  )
}

export default VinylCollection