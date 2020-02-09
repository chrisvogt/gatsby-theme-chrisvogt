/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'

import CallToAction from '../call-to-action'
import TopTracks from './top-tracks'
import UserProfile from './user-profile'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import useWidgetContent from '../../../hooks/use-widget-content'

const SpotifyWidget = () => {
  const { isLoading, content } = useWidgetContent('spotify')

  const {
    collections: { topTracks } = [],
    metrics,
    profile: { displayName: profileDisplayName, profileURL } = {},
    provider: { displayName: providerDisplayName } = {}
  } = content

  return (
    <Widget id='spotify'>
      <WidgetHeader>Spotify</WidgetHeader>

      <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `1fr 70%`] }}>
        <Box>
          <UserProfile isLoading={isLoading} metrics={metrics} />
        </Box>
        <Box>
          <TopTracks isLoading={isLoading} tracks={topTracks} />
        </Box>
      </Grid>

      <CallToAction
        title={`${profileDisplayName} on ${providerDisplayName}`}
        url={profileURL}
      >
        View {providerDisplayName} profile &raquo;
      </CallToAction>
    </Widget>
  )
}

export default SpotifyWidget
