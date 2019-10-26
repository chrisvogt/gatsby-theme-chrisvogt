/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui'

import LatestCommit from './latest-commit'
import PinnedRepositories from './pinned-repositories'
import SwoopBottom from '../../artwork/swoop-bottom'
import SwoopTop from './../../artwork/swoop-top'
import theme from '../../../gatsby-plugin-theme-ui'

export default () => (
  <Styled.div
    id='github'
    sx={{
      variant: `styles.GitHub`
    }}
  >
    <SwoopTop fill={theme.colors.background} />

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

    <SwoopBottom fill={theme.colors.background} />
  </Styled.div>
)
