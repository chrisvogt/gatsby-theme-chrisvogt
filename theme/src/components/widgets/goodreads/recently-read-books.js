/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import kebabCase from 'lodash/kebabCase'
import { RectShape } from 'react-placeholder/lib/placeholders'

import BookLink from './book-link'

const RecentlyReadBooks = ({ books, isLoading }) => (
  <div className='gallery'>
    <div sx={{ mb: 4 }}>
      <Heading
        as='h3'
        sx={{
          mb: 3
        }}
      >
        Books
      </Heading>

      <p>
        Following are the latest books I've read, in descending order, by date.
      </p>

      <div
        sx={{
          display: `grid`,
          gridGap: [3, 1, 2],
          gridTemplateColumns: [`repeat(4, 1fr)`, `repeat(6, 1fr)`]
        }}
      >
        {isLoading &&
          Array(12)
            .fill()
            .map(item => {
              return (
                <RectShape
                  color='#efefef'
                  sx={{ boxShadow: `md`, width: `100%`, minHeight: `140px` }}
                />
              )
            })}
        {!isLoading &&
          books.map(book => {
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
  </div>
)

export default RecentlyReadBooks
