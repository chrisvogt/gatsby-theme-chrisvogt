/** @jsx jsx */
import { Fragment } from 'react'
import { jsx } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faBehance,
  faDribbble,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faStackOverflow,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

import useSocialProfiles from '../../hooks/use-social-profiles'

/**
 * icons is a library containing all of the social icons available for this theme.
 * This is to prevent the entire font awesome library from being included in the
 * bundle. See chrisvogt/gatsby-theme-chrisvogt#31 for to learn more.
 */
const icons = {
  faBehance,
  faDribbble,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faStackOverflow,
  faTwitter
}

/** Mapper function to attach React icon components to profile data. */
const profilesToIcons = profile => {
  const { icon: { reactIcon } = {} } = profile
  return {
    IconComponent: icons[reactIcon],
    profile
  }
}

export default () => {
  const profiles = useSocialProfiles()
  const profilesWithIcons = profiles.map(profilesToIcons)

  return (
    <Fragment>
      {profilesWithIcons.length &&
        profilesWithIcons.map(({ IconComponent, profile = {} }) => {
          const { displayName, href, slug } = profile
          return (
            <a key={slug} href={href} title={displayName} rel='me' sx={{ mx: [3, 4, 4, 5] }}>
              <FontAwesomeIcon icon={IconComponent} sx={{ fontSize: [4, 5, 6] }} />
            </a>
          )
        })}
    </Fragment>
  )
}
