/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'

/**
 * Home Page Header Content
 *
 * The content rendered into the home page header region. This content is rendered
 * inside of the header, on top of the themed background and below the top nav.
 */
const HomeHeaderContent = () => (
  <div sx={{ lineHeight: '2', mb: 5}}>
    <Themed.h1 sx={{
      mb: 0,
      pb: 0,
      fontSize: 'calc(1.5rem + 2vw)'
    }}>
      Hi! 👋 I'm Chris Vogt.
    </Themed.h1>
    <Themed.p>
      I'm a Sr. Software Engineer on a product team at GoDaddy, working on intelligent customer dashboards, in-app navigation,
      and reusable components. Outside of work, I live in the Castro in San Francisco, and I enjoy photography, practicing piano
      and traveling to new places.
    </Themed.p>
    <Themed.p>
      This website is a digital garden where I share things I'm excited about, things I've learned and things I'm working on.
    </Themed.p>
  </div>
)

export default HomeHeaderContent
