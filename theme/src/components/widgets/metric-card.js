/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'
import PropTypes from 'prop-types'

import Placeholder from 'react-placeholder'

/**
 * Metric Card
 *
 * Renders insights onto a card. Private Sphere renders these into the sidebar
 * area of the social widgets. They typically contain an insight for the social
 * profile (e.g., Followers: 24).
 */
const MetricCard = ({ title, value, showPlaceholder }) => (
  <Card sx={{ variant: `styles.MetricCard`, p: 3 }}>
    <Placeholder color='#efefef' ready={!showPlaceholder} showLoadingAnimation>
      <span>{value}</span>
      {title}
    </Placeholder>
  </Card>
)

MetricCard.propTypes = {
  /** An animated placeholder is rendered when true. */
  showPlaceholder: PropTypes.bool,
  /** The title of the metric. */
  title: PropTypes.string.isRequired,
  /** The value of the metric. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

MetricCard.defaultProps = {
  placeholder: false
}

export default MetricCard
