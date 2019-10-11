/** @jsx jsx */
import { jsx } from 'theme-ui'

import Container from './container'
import Profiles from './profiles'

export default () => (
  <div sx={{ backgroundColor: 'blue' }}>
    <Container>
      <Profiles />
    </Container>
  </div>
)
