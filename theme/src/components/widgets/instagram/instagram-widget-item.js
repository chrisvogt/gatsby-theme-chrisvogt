/** @jsx jsx */
import { jsx } from 'theme-ui'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DEFAULT_BORDER_RADIUS_WIDTH } from '../../../gatsby-plugin-theme-ui/styles'

const InstagramWidgetItem = ({ handleClick, index, post: { caption, cdnMediaURL, id, mediaType, permalink } = {} }) => {
  const isCarousel = mediaType === 'CAROUSEL_ALBUM"'

  return (
    <button
      key={id}
      onClick={event => handleClick(event, { index, photo: { caption, id, src: cdnMediaURL } })}
      rel='noopener noreferrer'
      sx={{
        variant: `styles.InstagramItem`
      }}
    >
      {isCarousel && (
        <div
          sx={{
            color: `white`,
            position: `absolute`,
            top: 2,
            right: 2
          }}
        >
          <FontAwesomeIcon icon={faImages} />
        </div>
      )}

      <img
        crossOrigin='anonymous'
        className='instagram-item-image'
        loading='lazy'
        src={`${cdnMediaURL}?h=280&w=280&fit=crop&crop=faces,focalpoint&auto=format`}
        height='280'
        width='280'
        alt='Instagram post thumbnail'
        sx={{
          borderRadius: DEFAULT_BORDER_RADIUS_WIDTH,
          width: '100%',
          height: '100%',
          transition: `all 1.5s ease`,
          objectFit: 'cover'
        }}
      />
    </button>
  )
}

export default InstagramWidgetItem
