/** @jsx jsx */
import { Container, jsx, Link } from 'theme-ui'

import Profiles from './profiles'
import SwoopTop from '../swoops/swoop-top'

import { getFooterText } from '../../selectors/metadata'
import useSiteMetadata from '../../hooks/use-site-metadata'

export default () => {
  const metadata = useSiteMetadata()
  const footerText = getFooterText(metadata)

  return (
    <footer id='footer' sx={{ variant: `styles.PageFooter` }}>
      <SwoopTop />
      <Container sx={{ textAlign: `center` }}>
        <div sx={{ mb: 3, pt: 3, pb: [4, 5] }}>
          <Profiles />
        </div>

        <span>{footerText ? <div>{footerText}</div> : null}</span>
        <span><Link href='/rss.xml'>Subscribe via RSS</Link></span>
      </Container>
    </footer>
  )
}
