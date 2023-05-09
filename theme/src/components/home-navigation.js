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
import useSiteMetadata from '../hooks/use-site-metadata'

import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoodreads, faSpotify, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * icons is a library containing all of the social icons available for this theme.
 * This is to prevent the entire font awesome library from being included in the
 * bundle. See chrisvogt/gatsby-theme-chrisvogt#31 for to learn more.
 */
const icons = {
  faGithub,
  faGoodreads,
  faInstagram,
  faNewspaper,
  faSpotify
}

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
      icon: {
        name: 'newspaper',
        reactIcon: 'faNewspaper'
      },
      id: 'posts',
      text: 'Latest Posts'
    }
  },
  {
    rule: options => !!options.isInstagramWidgetEnabled,
    value: {
      href: '#instagram',
      icon: {
        name: 'instagram',
        reactIcon: 'faInstagram'
      },
      id: 'instagram',
      text: 'Instagram'
    }
  },
  {
    rule: options => !!options.isGitHubWidgetEnabled,
    value: {
      href: '#github',
      icon: {
        name: 'github',
        reactIcon: 'faGithub'
      },
      id: 'github',
      text: 'GitHub'
    }
  },
  {
    rule: options => !!options.isGoodreadsWidgetEnabled,
    value: {
      href: '#goodreads',
      icon: {
        name: 'goodreads',
        reactIcon: 'faGoodreads'
      },
      id: 'goodreads',
      text: 'Goodreads'
    }
  },
  {
    rule: options => !!options.isSpotifyWidgetEnabled,
    value: {
      href: '#spotify',
      icon: {
        name: 'spotify',
        reactIcon: 'faSpotify'
      },
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

  return links
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
      <Heading aria-hidden='true' sx={{ display: ['none', 'revert'], mt: 0, mb: 4, visibility: 'hidden' }}>
        Widget Navigation
      </Heading>
      <Card
        sx={{
          boxShadow: 'default',
          display: ['none', 'block'],
          position: `sticky`,
          top: `1.5em`
        }}
        variant='actionCard'
      >
        <nav aria-label='Navigate to on-page sections' ref={navItemsRef}>
          <h2
            className='sr-only'
            sx={{
              fontFamily: `heading`,
              fontWeight: `unset`,
              mb: 2,
              mt: 0
            }}
          >
            On-page navigation
          </h2>

          {links.map(({ href, icon, id, text }) => {
            const IconComponent = icon?.reactIcon && icons[icon.reactIcon] ? icons[icon.reactIcon] : null
            return (
              <Link
                href={href}
                key={id}
                variant='homeNavigation'
                sx={{
                  fontFamily: `heading`,
                  color: `var(--theme-ui-colors-panel-text)`
                }}
              >
                {IconComponent ? <FontAwesomeIcon icon={IconComponent} style={{ height: '18px' }} sx={{ fontSize: '18px', mr: 2 }} /> : null}
                {text}
              </Link>
            )
          })}
        </nav>
      </Card>
    </Fragment>
  )
}

export default HomeNavigation
