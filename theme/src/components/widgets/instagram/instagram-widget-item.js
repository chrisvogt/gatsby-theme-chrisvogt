/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

const InstagramWidgetItem = props => {
  const { post: { cdnMediaURL, id, mediaType, permalink } = {} } = props

  const isCarousel = mediaType === 'CAROUSEL_ALBUM"'

  return (
    <Styled.a
      key={id}
      href={permalink}
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
        src={`${cdnMediaURL}?h=400`}
        height='400'
        alt='Instagram post thumbnail'
        sx={{
          width: '100%',
          height: '100%',
          transition: `all 1.5s ease`,
          objectFit: 'cover'
        }}
      />
    </Styled.a>
  )
}

export default InstagramWidgetItem
