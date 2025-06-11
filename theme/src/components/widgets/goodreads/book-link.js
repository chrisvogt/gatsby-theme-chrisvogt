/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'
import { Link } from 'gatsby'
import Book from '../../artwork/book'

const BookLink = ({ id, thumbnailURL, title }) => (
  <Link
    to={`?bookId=${id}`}
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
      <Book thumbnailURL={thumbnailURL} title={title} />
    </Card>
  </Link>
)

export default BookLink
