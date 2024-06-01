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
      Hi! 👋 
    </Themed.h1>
    <Themed.p>
      I'm Chris Vogt, a Sr. Software Engineer on a product team at GoDaddy currently working intelligent, personalized customer
      dashboards, in-app navigation and reusable components. Outside of work, my hobbies include photography, practicing piano and
      traveling.
    </Themed.p>
    <Themed.p>
        This website is a digital garden where I share things I'm excited about, things I've learned and things I'm working on.
    </Themed.p>
  </div>
)

export default HomeHeaderContent
