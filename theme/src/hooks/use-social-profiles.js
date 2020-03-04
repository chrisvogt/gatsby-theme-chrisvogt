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
