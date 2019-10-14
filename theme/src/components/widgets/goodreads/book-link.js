/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import PropTypes from 'prop-types'

import Book from '../../artwork/book'

const BookLink = ({ infoLink, thumbnailURL, title }) => (
  <Styled.a href={infoLink} title={title}>
    <Book thumbnailURL={thumbnailURL} title={`${title} on Google Books`} />
  </Styled.a>
)

BookLink.propTypes = {
  title: PropTypes.string.isRequired,
  infoLink: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string.isRequired
}

export default BookLink
