/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import { Themed } from '@theme-ui/mdx'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

import Book from '../../artwork/book'
import ViewExternal from '../view-external'

const renderStarsForRating = count => {
  const repeat = (char, n) => Array(n).fill(char).join('')
  return repeat('★', count) + repeat('☆', 5 - count)
}

const BookExplorer = ({ book, onClose }) => {
  const { authors, description, infoLink, rating, thumbnailURL, title } = book
  const location = useLocation()

  return (
    <Card variant='actionCard'>
      <div
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          gap: 4,
          p: 3
        }}
      >
        {/* Book Cover */}
        <div
          sx={{
            flex: '0 0 200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div sx={{ width: '100%', maxWidth: '200px' }}>
            <Book thumbnailURL={thumbnailURL} title={title} />
          </div>
          <Link
            to={location.pathname}
            onClick={e => {
              e.preventDefault()
              onClose()
            }}
            sx={{
              mt: 2,
              color: 'textMuted',
              fontSize: 1,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            ← Back to grid view
          </Link>
        </div>

        {/* Book Details */}
        <div sx={{ flex: 1 }}>
          <Heading as='h3' sx={{ mb: 2, fontSize: [3, 4] }}>
            {title}
          </Heading>

          <Themed.p sx={{ mb: 2, color: 'textMuted' }}>by {authors.join(', ')}</Themed.p>

          <div sx={{ mb: 3 }}>
            <span sx={{ color: 'textMuted', mr: 2 }}>Rating:</span>
            <span sx={{ color: 'primary' }}>{renderStarsForRating(parseInt(rating, 10))}</span>
          </div>

          <Themed.p sx={{ mb: 3 }}>{description}</Themed.p>

          <Themed.a
            href={infoLink}
            target='_blank'
            rel='noopener noreferrer'
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'primary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Learn more on Google Books
            <ViewExternal platform='Google Books' />
          </Themed.a>
        </div>
      </div>
    </Card>
  )
}

export default BookExplorer
