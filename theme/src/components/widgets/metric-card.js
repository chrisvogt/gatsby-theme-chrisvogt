/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'
import PropTypes from 'prop-types'

const MetricCard = ({ title, value }) => (
  <Card sx={{ variant: `styles.MetricCard`, p: 2 }}>
    <span>{value}</span>
    {title}
  </Card>
)

MetricCard.propTypes = {
  /** The title of the metric. */
  title: PropTypes.string.isRequired,
  /** The value of the metric. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default MetricCard
