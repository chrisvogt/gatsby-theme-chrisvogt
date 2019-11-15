/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import kebabCase from 'lodash/kebabCase'

import BookLink from './book-link'

const RecentlyReadBooks = ({ books, isLoading }) => (
  <div className='gallery'>
    {isLoading ? (
      <span>Loading...</span>
    ) : (
      <div sx={{ mb: 4 }}>
        <Heading
          as='h3'
          sx={{
            marginBottom: '1rem'
          }}
        >
          Recently Read Books
        </Heading>
        <div
          sx={{
            display: `grid`,
            gridGap: 3,
            gridTemplateColumns: [`repeat(4, 1fr)`, `repeat(6, 1fr)`]
          }}
        >
          {books.map(book => {
            const { infoLink, smallThumbnail: thumbnailURL, title } = book
            return (
              <BookLink
                key={kebabCase(title)}
                infoLink={infoLink}
                thumbnailURL={thumbnailURL}
                title={title}
              />
            )
          })}
        </div>
      </div>
    )}
  </div>
)

export default RecentlyReadBooks
