/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faImages } from '@fortawesome/free-solid-svg-icons'

const InstagramWidgetItem = props => {
  const {
    post: {
      id,
      comments: { count: commentsCount = 0 },
      images: { standard_resolution: { height, width, url } = {} },
      likes: { count: likesCount = 0 },
      link,
      type
    } = {}
  } = props

  const [isInFocus, setIsInFocus] = useState(false)
  const isCarousel = type === 'carousel'

  return (
    <Styled.a
      key={id}
      href={link}
      onMouseEnter={() => setIsInFocus(true)}
      onMouseLeave={() => setIsInFocus(false)}
      style={{ lineHeight: 0 }}
      title='Access media on Instagram'
      rel='noopener noreferrer'
      sx={{
        variant: `styles.InstagramCard`
      }}
    >
      {isInFocus && (
        <div
          className='instagram-item-overlay'
          sx={{
            color: `white`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-evenly`,
            background: `rgba(0, 0, 0, 0.3)`,
            width: `100%`,
            overflow: `hidden`,
            height: `100%`,
            position: `absolute`,
            zIndex: 33
          }}
        >
          <ul
            sx={{
              alignItems: `center`,
              color: `white`,
              display: `flex`,
              fontWeight: `bold`,
              justifyContent: `center`,
              listStyle: `none`,
              p: 0
            }}
          >
            <li
              sx={{
                alignItems: `center`,
                mr: 4
              }}
            >
              <span sx={{ mr: 1 }}>
                <FontAwesomeIcon icon={faHeart} />{' '}
              </span>
              <span>{likesCount}</span>
            </li>
            <li
              sx={{
                mr: 0
              }}
            >
              <span sx={{ mr: 1 }}>
                <FontAwesomeIcon icon={faComment} />{' '}
              </span>
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      )}

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
        src={url}
        height={height}
        width={width}
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
