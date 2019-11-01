/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'

import MetricCard from './metric-card'
import StatusCard from './status-card'

export default ({ isLoading, user }) => {
  if (isLoading) {
    return 'Loading...'
  }

  const { repositories = {}, followers = {}, following = {} } = user

  const metrics = [
    {
      key: 'repositories',
      title: 'Repositories',
      value: repositories.totalCount
    },
    {
      key: 'followers',
      title: 'Followers',
      value: followers.totalCount
    },
    {
      key: 'following',
      title: 'Following',
      value: following.totalCount
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
        Status
      </Heading>

      <StatusCard
        message={user.status.message}
        updatedAt={user.status.updatedAt}
      />

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
        {metrics.map(({ key, title, value }) => (
          <MetricCard metric={key} title={title} value={value} />
        ))}
      </div>
    </Card>
  )
}
