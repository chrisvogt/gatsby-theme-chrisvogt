/** @jsx jsx */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading } from '@theme-ui/components'
import { jsx } from 'theme-ui'

const headerStyles = {
  textAlign: ['center', 'left'],
  display: 'flex',
  flexDirection: ['column', 'row'],
  alignItems: ['', 'center']
}

const asideStyles = {
  ml: [0, 2]
}

const WidgetHeader = ({ aside, children, icon }) => (
  <header sx={headerStyles}>
    <Heading>
      {icon && <FontAwesomeIcon icon={icon} style={{ height: '22px' }} sx={{ mr: 2 }} />}
      {children}
    </Heading>
    {aside && <div sx={asideStyles}>{aside}</div>}
  </header>
)

export default WidgetHeader
