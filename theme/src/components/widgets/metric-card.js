/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Card } from '@theme-ui/components'
import PropTypes from 'prop-types'

import isDarkMode from '../../helpers/isDarkMode'
import Placeholder from 'react-placeholder'

/**
 * Metric Card
 *
 * Renders insights onto a card. These are rendered into the sidebar area of
 * the social widgets. They typically contain an insight for the social
 * profile (e.g., Followers: 24).
 */
const MetricCard = ({ title, value, showPlaceholder }) => {
  const { colorMode } = useThemeUI()
  const variant = isDarkMode(colorMode) ? 'infoCardDark' : 'infoCard'

  return (
    <Card variant={variant}>
      <Placeholder
        color='#efefef'
        ready={!showPlaceholder}
        showLoadingAnimation
      >
        <span>{value}</span>
        {title}
      </Placeholder>
    </Card>
  )
}

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
