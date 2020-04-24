/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import PropTypes from 'prop-types'

const WidgetHeader = ({ aside, children }) => (
  <header sx={{ variant: `styles.WidgetHeadline` }}>
    <Heading>{children}</Heading>
    {aside && (
      <div sx={{ variant: `styles.WidgetHeadline__Aside` }}>{aside}</div>
    )}
  </header>
)

WidgetHeader.propTypes = {
  /** The content to render in the headline. */
  children: PropTypes.node.isRequired
}

export default WidgetHeader
