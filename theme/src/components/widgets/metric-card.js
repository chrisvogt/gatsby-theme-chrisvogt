/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Card } from '@theme-ui/components'

import isDarkMode from '../../helpers/isDarkMode'
import Placeholder from 'react-placeholder'

/**
 * Metric Card
 *
 * Renders insights onto a card. These are rendered into the sidebar area of
 * the social widgets. They typically contain an insight for the social
 * profile (e.g., Followers: 24).
 */
const MetricCard = ({ title, value, showPlaceholder = false }) => {
  const { colorMode } = useThemeUI()
  const variant = isDarkMode(colorMode) ? 'metricCardDark' : 'metricCard'

  return (
    <Card variant={variant}>
      <Placeholder color='#efefef' ready={!showPlaceholder} showLoadingAnimation>
        <span>{value}</span>
        {title}
      </Placeholder>
    </Card>
  )
}

export default MetricCard
