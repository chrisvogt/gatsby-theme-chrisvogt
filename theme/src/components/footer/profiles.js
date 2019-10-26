/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { darken } from '@theme-ui/color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useSocialProfiles from '../../hooks/use-social-profiles'

import theme from '../../gatsby-plugin-theme-ui'

export default () => {
  const { isLoading, profiles } = useSocialProfiles()
  return (
    <Flex
      as='nav'
      sx={{
        alignItems: `center`,
        flex: 1,
        justifyContent: `space-around`,
        pt: 3,
        pb: 4
      }}
    >
      {!isLoading &&
        profiles.map(({ IconComponent, profile }) => {
          const { displayName = '', href, slug } = profile
          return (
            <a
              key={slug}
              href={href}
              title={displayName}
              rel='me'
              sx={{
                color: theme.colors.primary,
                '&:hover, &:focus': { color: darken(theme.colors.primary, 0.1) }
              }}
            >
              <FontAwesomeIcon icon={IconComponent} size='2x' />
            </a>
          )
        })}
    </Flex>
  )
}
