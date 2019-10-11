/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import Container from './container'
import getSocialProfiles from '../api/personal-api/getSocialProfiles'
// import useSiteMetadata from '../hooks/use-site-metadata'

export default () => {
  // const metadata = useSiteMetadata()

  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const profiles = await getSocialProfiles()
      setProfiles(profiles)
      setIsLoading(false)
    })()
  }, [])

  if (!isLoading) {
    console.log(profiles)
  }

  return (
    <Container
      background="#f8f9fa"
      sx={{
        mb: 3
      }}
    >
      <FontAwesomeIcon icon={faGithub} />
    </Container>
  )
}
