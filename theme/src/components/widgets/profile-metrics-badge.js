/** @jsx jsx */
import { Badge, jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const ProfileMetricsBadge = ({ isLoading, metrics }) => (
  <div sx={{
    fontFamily: 'heading',
    mt: 2,
    pb: 4,
    pt: 1,
    display: `flex`,
    justifyContent: [`center`, `unset`]
  }}>
    {(isLoading ? [{}, {}] : metrics).map(
      ({ displayName, id, value }, idx) => (
        <Badge key={id || idx} variant='outline' ml={idx !== 0 && 2}>
          {value} {displayName}
        </Badge>
      )
    )}
  </div>
)

ProfileMetricsBadge.propTypes = {
  /** Sets the component in a loading state when true. */
  isLoading: PropTypes.bool,
  /** The metrics for the user profile. */
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      displayName: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
}

export default ProfileMetricsBadge
