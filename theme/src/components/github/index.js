/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import LatestCommit from "./latest-commit"
import PinnedRepositories from "./pinned-repositories"
import SwoopTop from "../artwork/swoop-top"

export default () => (
  <Styled.div
    sx={{
      backgroundColor: "secondary"
    }}
  >
    <SwoopTop />
    <div
      sx={{
        display: ["block", "grid"],
        gridGap: 4,
        gridTemplateColumns: ["auto", "1fr 70%"],
        py: 4,
        px: 3
      }}
    >
      <LatestCommit />
      <PinnedRepositories />
    </div>
  </Styled.div>
)
