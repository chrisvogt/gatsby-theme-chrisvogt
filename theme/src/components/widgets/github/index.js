/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui'

import LatestCommit from './latest-commit'
import PinnedRepositories from './pinned-repositories'
import SwoopBottom from '../../artwork/swoop-bottom'

export default () => (
  <Styled.div
    id='github'
    sx={{
      variant: `styles.GitHub`
    }}
  >
    <Container>
      <div
        sx={{
          display: `grid`,
          gridGap: 4,
          gridTemplateColumns: [`auto`, `1fr 70%`]
        }}
      >
        <LatestCommit />
        <PinnedRepositories />
      </div>
    </Container>

    <SwoopBottom />
  </Styled.div>
)
