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
    <Heading sx={{ fontSize: 5, display: 'flex', alignItems: 'center' }}>
      {icon && <FontAwesomeIcon icon={icon} sx={{ fontSize: 4, size: '24px', mr: 2 }} />}
      {children}
    </Heading>
    {aside && <div sx={asideStyles}>{aside}</div>}
  </header>
)

export default WidgetHeader
