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
    <img alt='album cover' src={thumbnailURL} sx={{ width: `100%` }} />
  </Styled.a>
)

TrackPreview.propTypes = {
  link: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default TrackPreview
