/** @jsx jsx */
import { Container, jsx } from 'theme-ui'

import Profiles from './profiles'
import SwoopTop from '../swoops/swoop-top'

import { getFooterText } from '../../selectors/metadata'
import useSiteMetadata from '../../hooks/use-site-metadata'

export default () => {
  const metadata = useSiteMetadata()
  const footerText = getFooterText(metadata)

  return (
    <div sx={{ variant: `styles.PageFooter` }}>
      <SwoopTop />
      <Container sx={{ textAlign: `center` }}>
        <div sx={{ mb: 3, pt: 3, pb: [4, 5] }}>
          <Profiles />
        </div>

        {/* <div>{footerText}</div> */}
      </Container>
    </div>
  )
}
