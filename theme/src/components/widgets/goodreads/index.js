/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import kebabCase from 'lodash/kebabCase'

import useRecentBooks from '../../../hooks/use-recent-books'

import BookLink from './book-link'

export default () => {
  const { isLoading, books } = useRecentBooks()

  return (
    <Container
      id='goodreads'
      sx={{
        backgroundColor: `#f8f9fa`,
        mb: 4
      }}
    >
      <Styled.h3
        sx={{
          backgroundColor: `white`,
          mt: 0,
          mb: 4,
          padding: 3
        }}
      >
        Recently Read Books
      </Styled.h3>

      <div className='gallery'>
        {isLoading && <h3>Loading...</h3>}

        <div
          sx={{
            display: `grid`,
            gridGap: 3,
            gridTemplateColumns: [`repeat(4, 1fr)`, `repeat(6, 1fr)`]
          }}
        >
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
    </Container>
  )
}
