/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const Widget = ({ children, id }) => {
  return (
    <div sx={{ variant: 'styles.Widget' }} {...(id ? { id } : {})}>
      {children}
    </div>
  )
}

Widget.propTypes = {
  /** The elements to render within the widget. */
  children: PropTypes.node.isRequired,
  /** An id added to the widget wrapper element. */
  id: PropTypes.string
}

export default Widget
