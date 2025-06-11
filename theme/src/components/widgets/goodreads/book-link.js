/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'
import { Link } from 'gatsby'
import Book from '../../artwork/book'

const BookLink = ({ id, thumbnailURL, title }) => {
  // Ensure we have a valid URL and append webp format if it's a CDN URL
  const imageUrl = thumbnailURL?.startsWith('https://chrisvogt.imgix.net') ? `${thumbnailURL}?fm=webp` : thumbnailURL

  return (
    <Link
      to={`?bookId=${id}`}
      replace
      state={{ noScroll: true }}
      title={title}
      sx={{
        color: 'var(--theme-ui-colors-panel-text)',
        textDecoration: 'none',
        display: 'block',
        height: '100%',
        '&:hover, &:focus': {
          textDecoration: 'none'
        }
      }}
    >
      <Card
        variant='actionCard'
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)'
          }
        }}
      >
        <Book thumbnailURL={imageUrl} title={title} />
      </Card>
    </Link>
  )
}

export default BookLink
