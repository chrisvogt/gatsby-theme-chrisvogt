/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Card } from '@theme-ui/components'
import PropTypes from 'prop-types'

import isDarkMode from '../../helpers/isDarkMode'

const StatusCard = ({ message }) => {
  const { colorMode } = useThemeUI()
  const variant = isDarkMode(colorMode) ? 'infoCardDark' : 'infoCard'

  return (
    <Card variant={variant} sx={{ mb: 3 }}>
      {message}
    </Card>
  )
}

StatusCard.propTypes = {
  /** The GitHub user's status message. */
  message: PropTypes.string
}

export default StatusCard
