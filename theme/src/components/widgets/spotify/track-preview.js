/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'
import PropTypes from 'prop-types'

const TrackPreview = ({ link, name, thumbnailURL }) => (
  <Themed.a
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
        objectFit: 'cover',
        width: '100%'
      }}
    />
  </Themed.a>
)

TrackPreview.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string.isRequired
}

export default TrackPreview
