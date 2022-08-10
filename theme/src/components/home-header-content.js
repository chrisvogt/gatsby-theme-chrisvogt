/** @jsx jsx */
import { jsx, Container, Flex, Link, Themed } from 'theme-ui'

/**
 * Home Page Header Content
 *
 * The content rendered into the home page header region. This content is rendered
 * inside of the header, on top of the themed background, and below the top nav.
 */
const HomeHeaderContent = ({ headline }) => (
  <Flex sx={{ width: '100%', justifyContent: 'center' }}>
    <div sx={{
      'max-width': ['90%', '75%'],
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
      <Flex sx={{ fontSize: 2, gap: `2em` }}>
        <Link href='/about/me'>
          More about me &rarr;
        </Link>
        <Link href='/about/site'>
          More about this site &rarr;
        </Link>
      </Flex>
    </div>
  </Flex>
)

export default HomeHeaderContent
