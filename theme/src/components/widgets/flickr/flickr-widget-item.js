/** @jsx jsx */
import { jsx } from 'theme-ui'

const FlickrWidgetItem = ({ handleClick, index, photo: { title, thumbnailUrl, id } = {} }) => {
  return (
    <button
      key={id}
      onClick={event => handleClick(event, { index, photo: { title, id, src: thumbnailUrl } })}
      rel='noopener noreferrer'
      className='flickr-item-button'
      sx={{
        variant: 'styles.FlickrItem'
      }}
    >
      <img
        crossOrigin='anonymous'
        className='flickr-item-image'
        loading='lazy'
        src={thumbnailUrl}
        height='280'
        width='280'
        alt={`Flickr photo: ${title}`}
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

export default FlickrWidgetItem
