/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { Themed } from '@theme-ui/mdx'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'

import BookExplorer from './book-explorer'
import BookLink from './book-link'

export const HEADLINE = 'Books'
export const BODY_TEXT = 'The last 12 books I read and finished.'

const RecentlyReadBooks = ({ books = [], isLoading }) => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const bookId = params.get('bookId')
  const selectedBook = bookId ? books.find(book => book.id === bookId) : null

  const handleClose = () => {
    navigate(location.pathname)
  }

  return (
    <div className='gallery'>
      <div sx={{ mb: 4 }}>
        <Heading
          as='h3'
          sx={{
            mb: 3,
            fontSize: [3, 4]
          }}
        >
          {HEADLINE}
        </Heading>

        <Themed.p>{BODY_TEXT}</Themed.p>

        {selectedBook ? (
          <BookExplorer book={selectedBook} onClose={handleClose} />
        ) : (
          <div
            sx={{
              display: 'grid',
              gridGap: [3, 1, 2],
              gridTemplateColumns: ['repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)', 'repeat(6, 1fr)']
            }}
          >
            {isLoading &&
              Array(12)
                .fill()
                .map((item, idx) => (
                  <RectShape
                    color='#efefef'
                    key={idx}
                    sx={{
                      boxShadow: 'md',
                      minHeight: '140px',
                      width: '100%'
                    }}
                  />
                ))}
            {!isLoading &&
              books.map(book => (
                <BookLink id={book.id} key={book.id} thumbnailURL={`${book.cdnMediaURL}?fm=webp`} title={book.title} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentlyReadBooks
