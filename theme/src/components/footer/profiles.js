/** @jsx jsx */
import { Fragment } from 'react'
import { jsx } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useSocialProfiles from '../../hooks/use-social-profiles'

export default () => {
  const { isLoading, profiles } = useSocialProfiles()
  return (
    <Fragment>
      {!isLoading &&
        profiles.map(({ IconComponent, profile }) => {
          const { displayName, href, slug } = profile
          return (
            <a
              key={slug}
              href={href}
              title={displayName}
              rel='me'
              sx={{ mx: 2 }}
            >
              <FontAwesomeIcon icon={IconComponent} size='lg' />
            </a>
          )
        })}
    </Fragment>
  )
}
