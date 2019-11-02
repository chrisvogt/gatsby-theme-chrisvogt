/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import theme from '../../gatsby-plugin-theme-ui'

const Widget = ({ children, id }) => {
  return (
    <div
      sx={{
        backgroundColor: [`background`, `#fbfbfb`],

        borderLeft: [``, `3px solid #cbd5e0`],
        borderRadius: [``, `2px`],
        borderTop: [``, `1px solid white`],
        boxShadow: [``, theme.shadows.default],
        ...(id ? { id } : {}),
        mb: [3, 4],
        p: [0, 3, 4],
        '&:not(:last-of-type)': {
          borderBottom: [`2px solid #f9f9f9`, `1px solid white`]
        }
      }}
    >
      {children}
    </div>
  )
}

Widget.propTypes = {
  /** The elements to render within the widget. */
  children: PropTypes.node.isRequired,
  /** An id added to the widget wrapper. */
  id: PropTypes.string
}

export default Widget
