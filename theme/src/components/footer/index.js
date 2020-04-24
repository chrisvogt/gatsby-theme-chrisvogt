/** @jsx jsx */
import { Container, jsx } from 'theme-ui'

import Credits from './credits'
import Profiles from './profiles'
import SwoopTop from '../artwork/swoop-top'

import theme from '../../gatsby-plugin-theme-ui'

export default () => (
  <div sx={{ variant: `styles.Footer` }}>
    <SwoopTop fill={theme.colors.background} />
    <Container sx={{ textAlign: `center` }}>
      <div sx={{ mb: 3, pt: 3, pb: [4, 5] }}>
        <Profiles />
      </div>
      <Credits />
    </Container>
  </div>
)
