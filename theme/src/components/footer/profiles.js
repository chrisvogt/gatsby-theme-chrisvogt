/** @jsx jsx */
import { Fragment } from 'react'
import { jsx } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useSocialProfiles from '../../hooks/use-social-profiles'

export default () => {
  const { isLoading, profiles } = useSocialProfiles()
  return (
    <Fragment>
      <h4 sx={{ mb: 4 }}>My social profiles</h4>
      {!isLoading &&
        profiles.map(({ IconComponent, profile }) => {
          const { displayName, href, slug } = profile
          return (
            <a
              key={slug}
              href={href}
              title={displayName}
              rel='me'
              sx={{ mx: [3, 4, 4, 5] }}
            >
              <FontAwesomeIcon
                icon={IconComponent}
                sx={{ fontSize: [4, 5, 6] }}
              />
            </a>
          )
        })}
    </Fragment>
  )
}
