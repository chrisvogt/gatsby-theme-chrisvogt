/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useSocialProfiles from '../hooks/use-social-profiles'

export default () => {
  const { isLoading, profiles } = useSocialProfiles()

  return (
    <Flex
      as='nav'
      sx={{
        alignItems: `center`,
        flex: 1,
        justifyContent: `space-around`
      }}
    >
      {!isLoading &&
        profiles.map(({ IconComponent, profile }) => {
          const { displayName = '', href, slug } = profile
          return (
            <a key={slug} href={href} title={displayName} rel='me'>
              <FontAwesomeIcon
                color='green'
                icon={IconComponent}
                size='4x'
                inverse
              />
            </a>
          )
        })}
    </Flex>
  )
}
