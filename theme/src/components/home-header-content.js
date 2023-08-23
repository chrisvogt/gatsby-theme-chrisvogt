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
    <Themed.div sx={{
      maxWidth: ['90%', '75%'],
      pt: 2,
      pb: 4
    }}>
      <Themed.h1 sx={{
        mb: 0,
        pb: 0,
        fontWeight: '500'
      }}>
        {headline}
      </Themed.h1>
      <Themed.p>
        I'm a Sr. Software Engineer on a product team at GoDaddy currently focused on reusable components and
        personalized dashboards for the logged-in experience. Outside of work, my hobbies include
        photography, practicing piano and traveling.
      </Themed.p>
      <Themed.p>
         This website is a "digital garden" where I share personal thoughts, things I'm working on or excited
         about and my photography.
      </Themed.p>
    </Themed.div>
  </Flex>
)

export default HomeHeaderContent
