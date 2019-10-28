/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { Grid, Heading } from '@theme-ui/components'

import LatestCommit from './latest-commit'
import PinnedRepositories from './pinned-repositories'

export default () => (
  <Container
    id='github'
    sx={{
      mb: 4,
      variant: `styles.Widget`
    }}
  >
    <Heading sx={{ mb: 3 }}>GitHub</Heading>
    <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `1fr 70%`] }}>
      <LatestCommit />
      <PinnedRepositories />
    </Grid>
  </Container>
)
