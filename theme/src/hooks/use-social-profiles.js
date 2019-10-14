import { useEffect, useState } from 'react'
import getSocialProfiles from '../api/personal-api/get-social-profiles'

const useSocialProfiles = () => {
  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const profilesResponse = await getSocialProfiles()
      const profilesAndIcons = profilesResponse.map(profile => {
        const { icon: { reactIcon } = {} } = profile

        // NOTE(cvogt): this will fail when done client-side in a browser, and should
        // be refactored to happen server-side. Look into using the method described
        // at: https://www.npmjs.com/package/@fortawesome/react-fontawesome.
        const IconComponent = require('@fortawesome/free-brands-svg-icons')[
          reactIcon
        ]

        return {
          IconComponent,
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
