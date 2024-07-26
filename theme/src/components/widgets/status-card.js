/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Card } from '@theme-ui/components'

import isDarkMode from '../../helpers/isDarkMode'

const StatusCard = ({ message }) => {
  const { colorMode } = useThemeUI()
  const variant = isDarkMode(colorMode) ? 'metricCardDark' : 'metricCard'

  return (
    <Card variant={variant} sx={{ mb: 3 }}>
      {message}
    </Card>
  )
}

export default StatusCard
