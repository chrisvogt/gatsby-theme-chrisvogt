/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useSocialProfiles from '../hooks/use-social-profiles'

export default () => {
  const { isLoading, profiles } = useSocialProfiles()

  return (
    <div
      sx={{
        display: 'flex',
        justifyContent: 'space-around'
      }}
    >
      {!isLoading &&
        profiles.map(({ IconComponent, profile }) => {
          const { displayName = '', href, slug } = profile
          return (
            <a key={slug} href={href} title={displayName}>
              <FontAwesomeIcon
                color="green"
                icon={IconComponent}
                size="4x"
                inverse
              />
            </a>
          )
        })}
    </div>
  )
}
