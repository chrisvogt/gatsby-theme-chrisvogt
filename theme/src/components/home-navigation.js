/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, useThemeUI } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { Card } from '@theme-ui/components'

import isDarkMode from '../helpers/isDarkMode'

const links = [
  {
    href: '#posts',
    id: 'posts',
    text: 'Latest Posts'
  },
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
  borderBottom: theme =>
    console.log(theme.colors) || `1px solid ${theme.colors.gray[3]}`,
  mb: 3,
  a: {
    textDecoration: `none`
  }
}

const HomeNavigation = () => {
  const navItemsRef = useRef()
  const { colorMode } = useThemeUI()
  const cardStyle = isDarkMode(colorMode) ? 'infoCardDark' : 'infoCard'

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
    <Fragment>
      <h2 sx={{ display: ['none', 'revert'], mt: 0, visibility: 'hidden' }}>
        Navigation
      </h2>
      <Card
        sx={{
          position: `sticky`,
          top: `1.5em`
        }}
        variant={cardStyle}
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
    </Fragment>
  )
}

export default HomeNavigation
