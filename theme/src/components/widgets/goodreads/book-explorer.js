/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import { Themed } from '@theme-ui/mdx'
import { Link } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'

import Book from '../../artwork/book'
import ViewExternal from '../view-external'

const renderStarsForRating = count => {
  const repeat = (char, n) => Array(n).fill(char).join('')
  return repeat('★', count) + repeat('☆', 5 - count)
}

const BookExplorer = ({ book, onClose }) => {
  const { authors, cdnMediaURL, description, infoLink, rating, title } = book
  const location = useLocation()

  console.log('BookExplorer rendered with book:', book)

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
            <Book thumbnailURL={`${cdnMediaURL}?fm=webp`} title={title} />
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
          <Heading as='h3' sx={{ mb: 0, fontSize: [3, 4] }}>
            {title}
          </Heading>

          <Themed.p sx={{ mt: 0, mb: 2, color: 'textMuted' }}>by {authors.join(', ')}</Themed.p>

          <div sx={{ mt: 2, mb: 1 }}>
            <span sx={{ color: 'textMuted', mr: 2 }}>My Rating:</span>
            <span sx={{ color: 'primary' }}>{renderStarsForRating(parseInt(rating, 10))}</span>
          </div>

          <Themed.p sx={{ mt: 2, mb: 3 }}>{description}</Themed.p>

          <Themed.a
            href={infoLink}
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
            Learn more on Google Books &nbsp;
            <ViewExternal platform='Google Books' />
          </Themed.a>
        </div>
      </div>
    </Card>
  )
}

export default BookExplorer
