/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'

/**
 * Home Page Header Content
 *
 * The content rendered into the home page header region. This content is rendered
 * inside of the header, on top of the themed background and below the top nav.
 */
const HomeHeaderContent = ({ headline }) => (
  <div>
    <Themed.h1 sx={{
      mb: 0,
      pb: 0,
      fontWeight: '500'
    }}>
      Hi, 👋 I'm Chris Vogt
    </Themed.h1>
    <Themed.p>
      I'm a Sr. Software Engineer on a product team at GoDaddy. I work on creating intelligent customer dashboards, in-app navigation and reusable components. Outside of work, I enjoy photography, practicing piano and exploring new places.
    </Themed.p>
    <Themed.p>
      This website is a digital garden where I share things I'm excited about, things I've learned and things I'm working on.
    </Themed.p>
  </div>
)

export default HomeHeaderContent
