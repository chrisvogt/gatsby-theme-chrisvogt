/** @jsx jsx */
import { jsx, Flex, Styled } from 'theme-ui'

/**
 * Home Page Header Content
 *
 * The content rendered into the home page header region. This content is rendered
 * inside of the header, on top of the themed background, and below the top nav.
 */
const HomeHeaderContent = ({ avatar, headline, subhead }) => (
  <div
    sx={{
      display: [`block`, ``, `grid`],
      gridGap: 0,
      gridTemplateColumns: [``, ``, `1fr 60%`],
      mt: 5,
      width: `100%`
    }}
  >
    <Flex
      sx={{
        alignItems: [`center`, ``, `flex-end`],
        flexDirection: `column`
      }}
    >
      <img
        sx={{
          borderColor: `white`,
          borderRadius: `50%`,
          borderStyle: `solid`,
          borderWidth: 3,
          mr: [0, 0, 3]
        }}
        alt='Avatar'
        src={avatar}
        height='128'
        width='128'
      />
    </Flex>
    <Flex
      sx={{
        flexDirection: `column`,
        justifyContent: `center`,
        textAlign: [`center`, ``, `left`]
      }}
    >
      <Styled.h1 sx={{ mb: 0 }}>{headline}</Styled.h1>
      <Styled.p sx={{ py: 0, my: 0, fontSize: 2 }}>{subhead}</Styled.p>
    </Flex>
  </div>
)

export default HomeHeaderContent
