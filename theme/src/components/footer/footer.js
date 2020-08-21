/** @jsx jsx */
import { Container, jsx } from 'theme-ui'

import Profiles from './profiles'
import SwoopTop from '../artwork/swoop-top'

import {
  getFooterText,
  getProfilesWidgetDataSourceMetas,
  getProfilesWidgetDataSourceProfiles
} from '../../selectors/metadata'

import useSiteMetadata from '../../hooks/use-site-metadata'

export default () => {
  const metadata = useSiteMetadata()

  const footerText = getFooterText(metadata)
  const metasDataSource = getProfilesWidgetDataSourceMetas(metadata)
  const profilesDataSource = getProfilesWidgetDataSourceProfiles(metadata)

  return (
    <div sx={{ variant: `styles.PageFooter` }}>
      <SwoopTop />
      <Container sx={{ textAlign: `center` }}>
        {metasDataSource && profilesDataSource && (
          <div sx={{ mb: 3, pt: 3, pb: [4, 5] }}>
            <Profiles />
          </div>
        )}

        <div>{footerText}</div>
      </Container>
    </div>
  )
}
