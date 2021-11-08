/** @jsx jsx */
import { Fragment } from 'react'
import { Heading, jsx, Link } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { Card } from '@theme-ui/components'

import {
  getGithubWidgetDataSource,
  getGoodreadsWidgetDataSource,
  getInstagramWidgetDataSource,
  getSpotifyWidgetDataSource
} from '../selectors/metadata'
import getIsDarkMode from '../helpers/isDarkMode'
import useSiteMetadata from '../hooks/use-site-metadata'

/**
 * Link Registry
 * 
 * The items in this array follow the following schema:
 * 
 * * rule {function} – validator function
 * * value {object} – props for the link item
 */
const linkRegistry = [
  {
    rule: () => true, // Everyone sees this.
    value: {
      href: '#posts',
      id: 'posts',
      text: 'Latest Posts'
    }
  },
  {
    rule: options => !!options.isInstagramWidgetEnabled,
    value: {
      href: '#instagram',
      id: 'instagram',
      text: 'Instagram'
    }
  },
  {
    rule: options => !!options.isGitHubWidgetEnabled,
    value: {
      href: '#github',
      id: 'github',
      text: 'GitHub'
    }
  },
  {
    rule: options => !!options.isGoodreadsWidgetEnabled,
    value: {
      href: '#goodreads',
      id: 'goodreads',
      text: 'Goodreads'
    }
  },
  {
    rule: options => !!options.isSpotifyWidgetEnabled,
    value: {
      href: '#spotify',
      id: 'spotify',
      text: 'Spotify'
    }
  }
]

const determineLinksToRender = (options = {}) => {
  const links = linkRegistry.reduce((linksToRender, { rule, value }) => {
    if (rule(options)) {
      linksToRender.push(value)
    }
    return linksToRender
  }, [])

  return links;
}

const HomeNavigation = () => {
  const navItemsRef = useRef()

  const metadata = useSiteMetadata()
  const links = determineLinksToRender({
    isGitHubWidgetEnabled: getGithubWidgetDataSource(metadata),
    isGoodreadsWidgetEnabled: getGoodreadsWidgetDataSource(metadata),
    isInstagramWidgetEnabled: getInstagramWidgetDataSource(metadata),
    isSpotifyWidgetEnabled: getSpotifyWidgetDataSource(metadata)
  })

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
      {/*
        This hack pushes the navigation card down so that it lines up with the
        first widget in the main column on desktop layouts. Another way to solve
        this might be to use React Refs and use JavaScript to line the top up
        exactly. I opted to instead just match the widget's header inside of a
        hidden element.
      */}
      <Heading
        aria-hidden='true'
        sx={{ display: ['none', 'revert'], mt: 0, mb: 4, visibility: 'hidden' }}
      >
        Widget Navigation
      </Heading>
      <Card
        sx={{
          boxShadow: 'default',
          display: ['none', 'block'],
          position: `sticky`,
          top: `1.5em`
        }}
        variant='infoCard'
      >
        <nav aria-label='Navigate to on-page sections' ref={navItemsRef}>
          <h3 sx={{ fontWeight: `unset`, mt: 0, mb: 2 }}>On-page navigation</h3>
          {links.map(({ href, id, text }) => (
            <Link href={href} key={id} variant='homeNavigation'>
              {text}
            </Link>
          ))}
        </nav>
      </Card>
    </Fragment>
  )
}

export default HomeNavigation
