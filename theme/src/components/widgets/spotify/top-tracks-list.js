/** @jsx jsx */
import { jsx, Styled, useThemeUI } from 'theme-ui'
import isDarkModeHelper from '../../../helpers/isDarkMode'

const TopTracksList = ({ isLoading, tracks = [] }) => {
  const { colorMode } = useThemeUI()
  const isDarkMode = isDarkModeHelper(colorMode)

  return (
    <ul
      sx={{
        p: 0,
        li: {
          p: 2
        },
        'li:nth-child(odd)': {
          backgroundColor: theme => isDarkMode ? `#252e3c` : theme.colors.gray[2]
        }
      }}
    >
      {!isLoading &&
        tracks.map(track => {
          const { albumImages = [], artists = [], id, name, spotifyURL } = track

          const { url: thumbnailURL } = albumImages.find(
            image => image.width === 300
          )

          return (
            <li key={id} sx={{ listStyle: `none` }}>
              <Styled.a
                href={spotifyURL}
                title={`Listen on Spotify`}
                sx={{
                  display: `flex`,
                  flex: 1
                }}
              >
                <div
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    maxWidth: `45px`
                  }}
                >
                  <img
                    alt='Song album cover'
                    crossOrigin='anonymous'
                    src={thumbnailURL}
                    sx={{
                      borderRadius: `4px`,
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                </div>
                <div sx={{ display: `flex`, alignItems: `center`, pl: 2 }}>
                  {name} by {artists.join(', ')}
                </div>
              </Styled.a>
            </li>
          )
        })}
    </ul>
  )
}

export default TopTracksList
