/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import { TextRow } from 'react-placeholder/lib/placeholders'
import 'react-placeholder/lib/reactPlaceholder.css'

import MetricCard from '../metric-card'
import StatusCard from '../status-card'

const UserProfile = ({ isLoading, user }) => {
  const {
    repositories: { totalCount: totalRepositoriesCount = 0 } = {},
    followers: { totalCount: totalFollowersCount = 0 } = {},
    following: { totalCount: totalFollowingCount = 0 } = {},
    status: { message: userStatusMessage = '' } = {}
  } = user || {}

  const metrics = [
    {
      id: 'repositories',
      title: 'Repositories',
      value: totalRepositoriesCount
    },
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

  return (
    <Card>
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
  }),
  repositories: PropTypes.shape({
    totalCount: PropTypes.number
  })
}

export default UserProfile
