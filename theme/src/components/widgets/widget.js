/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const widgetStyles = {
  mb: [3, 4],
  py: [0, 3, 4]
}

const Widget = ({ children, id }) => (
  <div sx={widgetStyles} {...(id ? { id } : {})}>
    {children}
  </div>
)

Widget.propTypes = {
  /** The elements to render within the widget. */
  children: PropTypes.node.isRequired,
  /** An id added to the widget wrapper element. */
  id: PropTypes.string
}

export default Widget
