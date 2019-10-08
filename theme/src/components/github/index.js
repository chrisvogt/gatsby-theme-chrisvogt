/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import Container from '../container'
import LatestCommit from './latest-commit'
import PinnedRepositories from './pinned-repositories'
import SwoopBottom from '../artwork/swoop-bottom'
import SwoopTop from '../artwork/swoop-top'

export default () => (
  <Styled.div
    sx={{
      backgroundColor: '#1E90FF'
    }}
  >
    <SwoopTop />
    <Container>
      <div
        sx={{
          display: ['block', 'grid'],
          gridGap: 4,
          gridTemplateColumns: ['auto', '1fr 70%'],
          py: 4,
          px: 3
        }}
      >
        <LatestCommit />
        <PinnedRepositories />
      </div>
    </Container>
    <SwoopBottom />
  </Styled.div>
)
