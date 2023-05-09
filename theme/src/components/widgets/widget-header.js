/** @jsx jsx */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading } from '@theme-ui/components'
import { jsx } from 'theme-ui'
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

const WidgetHeader = ({ aside, children, icon }) => (
  <header sx={headerStyles}>
    <Heading>
      {icon && <FontAwesomeIcon icon={icon} sx={{ fontSize: '22px', mr: 2 }} />}
      {children}
    </Heading>
    {aside && <div sx={asideStyles}>{aside}</div>}
  </header>
)

WidgetHeader.propTypes = {
  /** The content to render in the headline. */
  children: PropTypes.node.isRequired,
  /** The icon to render. Usually an SVG. */
  icon: PropTypes.node
}

export default WidgetHeader
