/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Link } from '@theme-ui/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState, useEffect } from 'react'
import useSiteMetadata from '../hooks/use-site-metadata'
import {
  getFlickrWidgetDataSource,
  getGithubWidgetDataSource,
  getGoodreadsWidgetDataSource,
  getInstagramWidgetDataSource,
  getSpotifyWidgetDataSource,
  getSteamWidgetDataSource
} from '../selectors/metadata'

import { faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faFlickr, faGithub, faGoodreads, faInstagram, faSpotify, faSteam } from '@fortawesome/free-brands-svg-icons'

const icons = {
  faHome,
  faNewspaper,
  faFlickr,
  faGithub,
  faGoodreads,
  faInstagram,
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
    rule: options => !!options.isFlickrWidgetEnabled,
    value: {
      href: '#flickr',
      icon: {
        name: 'flickr',
        reactIcon: 'faFlickr'
      },
      id: 'flickr',
      text: 'Flickr'
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
    isFlickrWidgetEnabled: getFlickrWidgetDataSource(metadata),
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
