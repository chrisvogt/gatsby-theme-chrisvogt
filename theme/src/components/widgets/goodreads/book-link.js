/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import PropTypes from 'prop-types'
import Book from '../../artwork/book'

const BookLink = ({ id, infoLink, thumbnailURL, title }) => (
  <Themed.a href={infoLink} title={title}>
    <Book id={id} thumbnailURL={thumbnailURL} title={`${title} on Google Books`} />
  </Themed.a>
)

BookLink.propTypes = {
  title: PropTypes.string.isRequired,
  infoLink: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string.isRequired
}

export default BookLink
