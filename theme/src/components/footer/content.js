/** @jsx jsx */
import { Container, jsx } from 'theme-ui'

import Credits from './credits'
import Profiles from './profiles'

/**
 * Footer Content
 *
 * Override to control the content rendered into the page footer.
 */
const Content = ({ footerText }) => (
  <Container sx={{ textAlign: `center` }}>
    <div sx={{ mb: 3, pt: 3, pb: [4, 5] }}>
      <Profiles />
    </div>
    <div>{footerText}</div>
  </Container>
)

export default Content
