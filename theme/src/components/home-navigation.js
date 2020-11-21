/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { Card } from '@theme-ui/components'

const links = [
  {
    href: '#instagram',
    id: 'instagram',
    text: 'Instagram'
  },
  {
    href: '#github',
    id: 'github',
    text: 'GitHub'
  },
  {
    href: '#goodreads',
    id: 'goodreads',
    text: 'Goodreads'
  },
  {
    href: '#spotify',
    id: 'spotify',
    text: 'Spotify'
  }
]

const navListItemStyles = {
  backgroundColor: `red`,
  borderBottom: theme => `1px solid ${theme.colors.primary}`,
  mb: 3,
  a: {
    textDecoration: `none`
  }
}

const HomeNavigation = () => {
  const navItemsRef = useRef()

  useEffect(() => {
    const navItemsEl = navItemsRef.current

    const handleSmoothScroll = event => {
      const el = event.target || event.srcElement
      if (el instanceof HTMLAnchorElement) {
        event.preventDefault()

        const href = el.getAttribute('href')
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        })
      }
    }

    navItemsEl.addEventListener('click', handleSmoothScroll)

    return () => {
      navItemsEl.removeEventListener('click', handleSmoothScroll)
    }
  }, [])

  return (
    <Card
      sx={{
        position: `sticky`,
        top: `1.5em`
      }}
    >
      <nav aria-label='Navigate to on-page sections'>
        On-page navigation
        <ul ref={navItemsRef} sx={{ listStyle: `none`, padding: 0 }}>
          {links.map(({ href, id, text }) => (
            <li key={id} sx={navListItemStyles}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  )
}

export default HomeNavigation
