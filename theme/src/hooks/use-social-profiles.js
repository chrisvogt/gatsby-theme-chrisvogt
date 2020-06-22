import { useEffect, useState } from 'react'
import getSocialProfiles from '../api/personal-api/fetch-social-profiles'

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

/**
 * icons is a library containing all of the social icons available for this theme.
 * This is to prevent the entire font awesome library from being included in the
 * bundle. See chrisvogt/gatsby-theme-private-sphere#31 for to learn more.
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

const useSocialProfiles = () => {
  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const profilesResponse = await getSocialProfiles()
      const profilesAndIcons = profilesResponse.map(profile => {
        const { icon: { reactIcon } = {} } = profile
        return {
          IconComponent: icons[reactIcon],
          profile
        }
      })

      setProfiles(profilesAndIcons)
      setIsLoading(false)
    })()
  }, [])

  return {
    isLoading,
    profiles
  }
}

export default useSocialProfiles
