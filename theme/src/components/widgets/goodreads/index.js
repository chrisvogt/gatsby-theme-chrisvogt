/** @jsx jsx */
import { jsx } from 'theme-ui'
import kebabCase from 'lodash/kebabCase'

import { getGoodreadsUsername } from '../../../selectors/metadata'
import useRecentBooks from '../../../hooks/use-recent-books'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import BookLink from './book-link'
import CallToAction from '../call-to-action'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

export default () => {
  const { isLoading, books } = useRecentBooks()
  const metadata = useSiteMetadata()
  const goodreadsUsername = getGoodreadsUsername(metadata)

  return (
    <Widget id='goodreads'>
      <WidgetHeader>Recently Read Books</WidgetHeader>

      <div className='gallery'>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
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
        )}
      </div>

      <CallToAction
        title={`${goodreadsUsername} on Goodreads`}
        url={`https://www.goodreads.com/${goodreadsUsername}`}
      >
        View Goodreads profile &raquo;
      </CallToAction>
    </Widget>
  )
}
