/** @jsx jsx */
import { jsx } from 'theme-ui'
import { faImages, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InstagramWidgetItem = ({
  isFocusedItem,
  handleClick,
  index,
  onFocus = () => {},
  onBlur = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  post: { caption, cdnMediaURL, id, mediaType } = {}
}) => {
  const isCarousel = mediaType === 'CAROUSEL_ALBUM'
  const isVideo = mediaType === 'VIDEO'

  return (
    <button
      key={id}
      onClick={event => handleClick(event, { index, photo: { caption, id, src: cdnMediaURL } })}
      rel='noopener noreferrer'
      className={`instagram-item-button media-item_media${isFocusedItem ? ' media-item--focused' : ''}`}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        variant: 'styles.InstagramItem'
      }}
    >
      {(isCarousel || isVideo) && (
        <div
          className='media-item_icon'
          data-testid={isVideo ? 'video-icon' : 'carousel-icon'}
          sx={{
            color: 'white',
            position: 'absolute',
            top: 2,
            right: 2,
            opacity: 0
          }}
        >
          <FontAwesomeIcon icon={isVideo ? faVideo : faImages} />
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
          width: '100%',
          height: '100%',
          transition: 'all 1.5s ease',
          objectFit: 'cover'
        }}
      />
    </button>
  )
}

export default InstagramWidgetItem
