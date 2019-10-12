/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import Container from '../container'
import Credits from './credits'
import Navigation from './navigation'
import Profiles from '../profiles'

export default () => (
  <div sx={{ backgroundColor: 'blue' }}>
    <Container>
      <Profiles />
    </Container>
    <div sx={{ backgroundColor: 'teal' }}>
      <Container>
        <Styled.div
          style={{
            color: 'muted',
            display: 'grid',
            width: '100%',
            gridTemplateColumns: '50% 1fr'
          }}
        >
          <div>
            <Credits />
          </div>
          <div style={{ textAlign: 'right' }}>
            <Navigation />
          </div>
        </Styled.div>
      </Container>
    </div>
  </div>
)
