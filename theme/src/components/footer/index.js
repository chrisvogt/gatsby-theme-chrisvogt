/** @jsx jsx */
import { Container, Footer as ThemeFooter, jsx, Styled } from 'theme-ui'

import Credits from './credits'
import Navigation from './navigation'
import Profiles from '../profiles'

export default () => (
  <ThemeFooter>
    <Container>
      <Profiles />
    </Container>
    <div sx={{ variant: 'styles.SubFooter' }}>
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
  </ThemeFooter>
)
