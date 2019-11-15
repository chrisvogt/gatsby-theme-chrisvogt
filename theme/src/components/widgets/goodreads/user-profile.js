/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import MetricCard from '../metric-card'
import StatusCard from '../status-card'

const UserProfile = ({ isLoading, profile }) => {
  if (isLoading) {
    return 'Loading...'
  }

  const { favoriteBooks, friendsCount, readCount } = profile

  const metrics = [
    {
      id: 'friends-count',
      title: 'Friends',
      value: friendsCount
    },
    {
      id: 'read-count',
      title: 'Read',
      value: readCount
    }
  ]

  return (
    <Card>
      <Heading
        as='h3'
        sx={{
          marginBottom: '1rem'
        }}
      >
        Favorite Genres
      </Heading>

      <StatusCard message={favoriteBooks} />

      <Heading
        as='h3'
        sx={{
          marginBottom: '1rem'
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
          <MetricCard key={id} title={title} value={value} />
        ))}
      </div>
    </Card>
  )
}

UserProfile.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool.isRequired,
  /** The Goodreads user profile. */
  profile: PropTypes.shape({
    favoriteBooks: PropTypes.string.isRequired,
    friendsCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    readcount: PropTypes.number.isRequired
  })
}

export default UserProfile
