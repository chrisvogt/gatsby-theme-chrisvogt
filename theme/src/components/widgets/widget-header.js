/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

const headerStyles = {
  textAlign: [`center`, `left`],
  display: `flex`,
  flexDirection: [`column`, `row`],
  alignItems: [``, `center`]
}

const asideStyles = {
  ml: [0, 2]
}

const WidgetHeader = ({ aside, children }) => (
  <header sx={headerStyles}>
    <Heading>{children}</Heading>
    {aside && <div sx={{ asideStyles }}>{aside}</div>}
  </header>
)

WidgetHeader.propTypes = {
  /** The content to render in the headline. */
  children: PropTypes.node.isRequired
}

export default WidgetHeader
