/** @jsx jsx */
import { Container, Footer as ThemeFooter, jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'

import Credits from './credits'
import Profiles from './profiles'
import SwoopTop from '../artwork/swoop-top'

import theme from '../../gatsby-plugin-theme-ui'

export default () => (
  <ThemeFooter sx={{ variant: `styles.Footer` }}>
    <SwoopTop fill={theme.colors.background} />
    <Container>&nbsp;</Container>
    <Container>
      <Grid sx={{ gridTemplateColumns: [`100%`, `50% 1fr`] }}>
        <Box sx={{ textAlign: [`center`, `left`] }}>
          <Credits />
        </Box>
        <Box sx={{ textAlign: [`center`, `right`] }}>
          <Profiles />
        </Box>
      </Grid>
    </Container>
  </ThemeFooter>
)
