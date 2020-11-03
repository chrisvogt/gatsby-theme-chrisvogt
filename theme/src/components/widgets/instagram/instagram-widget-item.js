/** @jsx jsx */
import { jsx } from 'theme-ui'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

const InstagramWidgetItem = ({ onClick, post }) => {
  const { cdnMediaURL, id, mediaType, permalink } = post
  const isCarousel = mediaType === 'CAROUSEL_ALBUM"'
  return (
    <div
      key={id}
      onClick={() => onClick(post)}
      style={{ lineHeight: 0 }}
      title='Access media on Instagram'
      rel='noopener noreferrer'
      sx={{
        variant: `styles.InstagramCard`
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
        src={`${cdnMediaURL}?h=400&fm=webp&auto=format`}
        height='400'
        alt='Instagram post thumbnail'
        sx={{
          width: '100%',
          height: '100%',
          transition: `all 1.5s ease`,
          objectFit: 'cover',
          '&:hover': {
            transform: `scale(1.4)`
          }
        }}
      />
    </div>
  )
}

export default InstagramWidgetItem
