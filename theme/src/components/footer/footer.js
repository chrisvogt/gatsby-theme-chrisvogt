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
    <footer role='contentinfo' id='footer' sx={{ position: 'relative', variant: `styles.PageFooter` }}>
      <Container sx={{ textAlign: `center` }}>
        <div sx={{ mb: 3, pt: [3, 4], pb: [1, 2] }}>
          <Profiles />

          <div sx={{ mt: [4, 5] }}>
            <span>{footerText ? <div>{footerText}</div> : null}</span>
            <span><Link href='/rss.xml'>Subscribe via RSS</Link></span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
