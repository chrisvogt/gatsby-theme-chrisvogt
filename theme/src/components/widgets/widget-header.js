/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

const WidgetHeader = ({ children }) => (
  <Heading sx={{ variant: `styles.WidgetHeadline` }}>{children}</Heading>
)

WidgetHeader.propTypes = {
  /** The content to render in the headline. */
  children: PropTypes.node.isRequired
}

export default WidgetHeader
