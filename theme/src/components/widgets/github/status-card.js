/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'
import PropTypes from 'prop-types'

const StatusCard = ({ message }) => (
  <Card sx={{ variant: `styles.MetricCard`, mb: 3 }}>{message}</Card>
)

StatusCard.propTypes = {
  /** The GitHub user's status message. */
  message: PropTypes.string.isRequired
}

export default StatusCard
