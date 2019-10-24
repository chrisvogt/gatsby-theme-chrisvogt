/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './artwork/swoop-bottom'
import theme from '../gatsby-plugin-theme-ui'

const Metrics = ({ children, swoopFill, styles }) => (
  <div sx={{ backgroundColor: `colors.background` }}>
    <div
      sx={{
        py: 5,
        ...(styles ? styles : {})
      }}
    >
      {children}
    </div>
    <SwoopBottom fill={theme.colors.primary} />
  </div>
)

export default Metrics
