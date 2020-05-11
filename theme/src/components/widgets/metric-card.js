/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Card } from '@theme-ui/components'
import PropTypes from 'prop-types'
import { RectShape } from 'react-placeholder/lib/placeholders'

/**
 * Metric Card
 *
 * Renders insights onto a card. Private Sphere renders these into the sidebar
 * area of the social widgets. They typically contain an insight for the social
 * profile (e.g., Followers: 24).
 */
const MetricCard = ({ title, value, placeholder }) => (
  <Card sx={{ variant: `styles.MetricCard`, p: 3 }}>
    {placeholder ? (
      <RectShape color='#efefef' style={{ height: `16px`, width: `100%` }} />
    ) : (
      <Fragment>
        <span>{value}</span>
        {title}
      </Fragment>
    )}
  </Card>
)

MetricCard.propTypes = {
  /** The title of the metric. */
  title: PropTypes.string.isRequired,
  /** The value of the metric. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default MetricCard
