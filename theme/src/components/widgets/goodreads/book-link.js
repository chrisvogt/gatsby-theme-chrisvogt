/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'
import { navigate as gatsbyNavigate } from 'gatsby'
import Book from '../../artwork/book'

const BookLink = ({ id, thumbnailURL, title }) => {
  // Ensure we have a valid URL and append webp format if it's a CDN URL
  const imageUrl = (() => {
    try {
      const url = new URL(thumbnailURL)
      return url.host === 'chrisvogt.imgix.net' ? `${thumbnailURL}?auto=compress&auto=format` : thumbnailURL
    } catch {
      return thumbnailURL // Return the original URL if it's invalid
    }
  })()

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation() // Prevent event bubbling
    // Store current scroll position
    const currentScroll = window.scrollY
    // Use a small timeout to ensure the scroll position is preserved
    setTimeout(() => {
      console.log('BookLink click:', {
        id,
        title,
        scrollY: currentScroll,
        pathname: window.location.pathname,
        search: window.location.search
      })
      // Use Gatsby's navigate for the initial click
      gatsbyNavigate(`?bookId=${id}`, {
        replace: true,
        state: {
          noScroll: true,
          scrollPosition: currentScroll
        }
      })
    }, 0)
  }

  return (
    <a
      data-testid='book-link'
      href={`?bookId=${id}`}
      onClick={handleClick}
      title={title}
      sx={{
        color: 'var(--theme-ui-colors-panel-text)',
        textDecoration: 'none',
        display: 'block',
        height: '100%',
        '&:hover, &:focus': {
          textDecoration: 'none'
        }
      }}
    >
      <Card
        variant='actionCard'
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)'
          }
        }}
      >
        <Book thumbnailURL={imageUrl} title={title} />
      </Card>
    </a>
  )
}

export default BookLink
