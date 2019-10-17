/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import kebabCase from 'lodash/kebabCase'

import { getGoodreadsUsername } from '../../../selectors/metadata'
import useRecentBooks from '../../../hooks/use-recent-books'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import BookLink from './book-link'

export default () => {
  const { isLoading, books } = useRecentBooks()
  const metadata = useSiteMetadata()
  const goodreadsUsername = getGoodreadsUsername(metadata)

  return (
    <Container
      id='goodreads'
      sx={{
        mb: 4,
        variant: `styles.Widget`
      }}
    >
      <Styled.h3 sx={{ variant: `styles.WidgetHeadline` }}>
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
      <div sx={{ marginTop: 4, variant: `styles.WidgetFooter` }}>
        <Styled.a href={`https://www.goodreads.com/${goodreadsUsername}`}>
          View Goodreads profile &raquo;
        </Styled.a>
      </div>
    </Container>
  )
}
