/** @jsx jsx */
import { Fragment, useEffect, useState } from 'react'
import { jsx, Link } from 'theme-ui'
import { useRef } from 'react'

import {
  getGithubWidgetDataSource,
  getGoodreadsWidgetDataSource,
  getInstagramWidgetDataSource,
  getSpotifyWidgetDataSource,
  getSteamWidgetDataSource
} from '../selectors/metadata'
import useSiteMetadata from '../hooks/use-site-metadata'

import { faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoodreads, faSpotify, faSteam, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * icons is a library containing all of the social icons available for this theme.
 * This is to prevent the entire font awesome library from being included in the
 * bundle. See chrisvogt/gatsby-theme-chrisvogt#31 for to learn more.
 */
const icons = {
  faGithub,
  faGoodreads,
  faHome,
  faInstagram,
  faNewspaper,
  faSpotify,
  faSteam
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
      href: '#top',
      icon: {
        name: 'home',
        reactIcon: 'faHome'
      },
      id: 'home',
      text: 'Home'
    }
  },
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
  },
  {
    rule: options => !!options.isSteamWidgetEnabled,
    value: {
      href: '#steam',
      icon: {
        name: 'steam',
        reactIcon: 'faSteam'
      },
      id: 'steam',
      text: 'Steam'
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
  const [activeSection, setActiveSection] = useState('home')

  const metadata = useSiteMetadata()
  const links = determineLinksToRender({
    isGitHubWidgetEnabled: getGithubWidgetDataSource(metadata),
    isGoodreadsWidgetEnabled: getGoodreadsWidgetDataSource(metadata),
    isInstagramWidgetEnabled: getInstagramWidgetDataSource(metadata),
    isSpotifyWidgetEnabled: getSpotifyWidgetDataSource(metadata),
    isSteamWidgetEnabled: getSteamWidgetDataSource(metadata)
  })

  useEffect(() => {
    if (!document) {
      return
    }
    const handleScroll = () => {
      let currentSection = 'home'
      links.forEach(section => {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= window.innerHeight / 2) {
          currentSection = section.id
        }
      })
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [links])

  return (
    <Fragment>
      <div
        sx={{
          display: ['none', '', 'block'],
          position: 'sticky',
          top: '1.5em'
        }}
      >
        <nav role='navigation' aria-label='On-page navigation' ref={navItemsRef}>
          {links.map(({ href, icon, id, text }) => {
            const IconComponent = icon?.reactIcon && icons[icon.reactIcon] ? icons[icon.reactIcon] : null
            return (
              <Link
                href={href}
                key={id}
                variant='homeNavigation'
                className={activeSection === id ? 'active' : ''}
                sx={{
                  fontFamily: 'sans',
                  color: 'text',
                  paddingX: 2,
                  '&.active': {
                    color: 'primary'
                  }
                }}
              >
                {IconComponent ? (
                  <FontAwesomeIcon icon={IconComponent} style={{ height: '18px' }} sx={{ mr: 2 }} />
                ) : null}
                {text}
              </Link>
            )
          })}
        </nav>
      </div>
    </Fragment>
  )
}

export default HomeNavigation
