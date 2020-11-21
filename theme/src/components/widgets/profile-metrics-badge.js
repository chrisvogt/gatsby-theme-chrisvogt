/** @jsx jsx */
import { Badge, jsx } from 'theme-ui'
import PropTypes from 'prop-types'

// import isDarkMode from '../../helpers/isDarkMode'

const ProfileMetricsBadge = ({ isLoading, metrics }) => {
  // const { colorMode } = useThemeUI()
  // const variant = isDarkMode(colorMode) ? 'UserProfileDark' : 'UserProfile'

  return (
    <div sx={{ pb: 4, pt: 1 }}>
      {(isLoading ? [{}, {}] : metrics).map(
        ({ displayName, id, value }, idx) => (
          <Badge key={id} variant='outline' ml={idx !== 0 && 2}>
            {value} {displayName}
          </Badge>
        )
      )}
    </div>
  )
}

ProfileMetricsBadge.propTypes = {
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

export default ProfileMetricsBadge
