/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import Book from '../../artwork/book'

const BookLink = ({ infoLink, thumbnailURL, title }) => (
  <Themed.a href={infoLink} title={title}>
    <Book thumbnailURL={thumbnailURL} title={`${title} on Google Books`} />
  </Themed.a>
)

export default BookLink
