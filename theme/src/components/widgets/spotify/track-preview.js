/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import PropTypes from 'prop-types'

const TrackPreview = ({ link, name, thumbnailURL }) => (
  <Styled.a
    href={link}
    title={name}
    sx={{
      variant: `styles.TrackPreview`
    }}
  >
    <img
      alt='album cover'
      crossOrigin='anonymous'
      src={thumbnailURL}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  </Styled.a>
)

TrackPreview.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string.isRequired
}

export default TrackPreview
