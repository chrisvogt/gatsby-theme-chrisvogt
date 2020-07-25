/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import { TextRow } from 'react-placeholder/lib/placeholders'
import 'react-placeholder/lib/reactPlaceholder.css'

import MetricCard from '../metric-card'
import StatusCard from '../status-card'

import isDarkMode from '../../../helpers/isDarkMode'

const UserProfile = ({ isLoading, user }) => {
  const {
    followers: { totalCount: totalFollowersCount = 0 } = {},
    following: { totalCount: totalFollowingCount = 0 } = {},
    status: { message: userStatusMessage = '' } = {}
  } = user || {}

  const metrics = [
    {
      id: 'followers',
      title: 'Followers',
      value: totalFollowersCount
    },
    {
      id: 'following',
      title: 'Following',
      value: totalFollowingCount
    }
  ]

  const { colorMode } = useThemeUI()
  const variant = isDarkMode(colorMode) ? 'UserProfileDark' : 'UserProfile'

  return (
    <Card variant={variant}>
      <Heading
        as='h3'
        sx={{
          mb: 3
        }}
      >
        Status
      </Heading>

      <StatusCard
        message={
          isLoading ? (
            <TextRow color='#efefef' style={{ marginTop: 0 }} />
          ) : (
            userStatusMessage
          )
        }
      />

      <Heading
        as='h3'
        sx={{
          mb: 3
        }}
      >
        Metrics
      </Heading>

      <div
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: `repeat(auto-fit, minmax(128px, 1fr))`
        }}
      >
        {metrics.map(({ id, title, value }) => (
          <MetricCard
            key={id}
            title={title}
            value={value}
            showPlaceholder={isLoading}
          />
        ))}
      </div>
    </Card>
  )
}

UserProfile.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool.isRequired,
  followers: PropTypes.shape({
    totalCount: PropTypes.number
  }),
  following: PropTypes.shape({
    totalCount: PropTypes.number
  })
}

export default UserProfile
