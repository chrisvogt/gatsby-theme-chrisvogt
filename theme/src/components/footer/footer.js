/** @jsx jsx */
import { Container, jsx, Link as ThemedLink } from 'theme-ui'
import { Link } from 'gatsby'

import Profiles from './profiles'

import { getFooterText } from '../../selectors/metadata'
import useSiteMetadata from '../../hooks/use-site-metadata'

export default () => {
  const metadata = useSiteMetadata()
  const footerText = getFooterText(metadata)

  return (
    <footer role='contentinfo' id='footer' sx={{ position: 'relative', variant: `styles.PageFooter` }}>
      <Container sx={{ textAlign: `center` }}>
        <div sx={{ mb: 3, py: [2, 3] }}>
          <Profiles />

          <div sx={{ mt: [4, 5] }}>
            <span>{footerText ? <div>{footerText}</div> : null}</span>
            <span><ThemedLink href='/rss.xml'>Subscribe via RSS</ThemedLink></span>
            {' | '}
            <span><Link to='/privacy'>Privacy Policy</Link></span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
