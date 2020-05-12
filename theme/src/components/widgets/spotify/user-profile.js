/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card, Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

import MetricCard from '../metric-card'

const UserProfile = ({ isLoading, metrics }) => {
  return (
    <Card>
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
        {(isLoading ? [{}, {}] : metrics).map(({ displayName, id, value }) => (
          <MetricCard
            key={id}
            title={displayName}
            value={value}
            placeholder={isLoading}
          />
        ))}
      </div>
    </Card>
  )
}

UserProfile.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool,
  /** The metrics for the user profile. */
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  )
}

export default UserProfile
