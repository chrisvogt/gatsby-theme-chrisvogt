/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'

/**
 * Home Page Header Content
 *
 * The content rendered into the home page header region. This content is rendered
 * inside of the header, on top of the themed background, and below the top nav.
 */
const HomeHeaderContent = ({ headline }) => (
  <Flex sx={{ width: '100%', justifyContent: 'center' }}>
    <div sx={{
      maxWidth: ['90%', '75%'],
      pt: 2,
      pb: 4
    }}>
      <Themed.h1 sx={{ mb: 0, pb: 0 }}>
        {headline}
      </Themed.h1>
      <p sx={{ fontSize: 2 }}>
        I'm a Software Engineer in San Francisco with an interest in
        photography, playing piano and building things with code. This
        website is a digital garden where I share things I'm working
        on or excited about.
      </p>
    </div>
  </Flex>
)

export default HomeHeaderContent
