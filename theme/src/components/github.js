/** @jsx jsx */
import { jsx, Styled, } from "theme-ui"

export default () => (
  <Styled.div sx={{
    display: 'grid',
    gridGap: 4,
    gridTemplateColumns: [
      'auto',
      '1fr 50%'
    ],
    backgroundColor: 'secondary'
  }}>
    <div>
      <Styled.h3>Latest Commit</Styled.h3>
      <Styled.p>Placeholder text.</Styled.p>
    </div>
    <div>
      <Styled.h3>Pinned Repositories</Styled.h3>
      <Styled.p>Placeholder text.</Styled.p>
    </div>
  </Styled.div>
)
