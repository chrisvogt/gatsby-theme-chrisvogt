/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'

import CallToAction from '../call-to-action'
import TopTracks from './top-tracks'
import UserProfile from './user-profile'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import useSiteMetadata from '../../../hooks/use-site-metadata'
import useDataSource from '../../../hooks/use-data-source'

import { getSpotifyWidgetDataSource } from '../../../selectors/metadata'

const SpotifyWidget = () => {
  const metadata = useSiteMetadata()
  const spotifyDataSource = getSpotifyWidgetDataSource(metadata)
  const { isLoading, data: content } = useDataSource(spotifyDataSource)

  const {
    collections: { topTracks } = [],
    metrics,
    profile: { displayName: profileDisplayName, profileURL } = {},
    provider: { displayName: providerDisplayName } = {}
  } = content

  const callToAction = (
    <CallToAction
      title={`${profileDisplayName} on ${providerDisplayName}`}
      url={profileURL}
      isLoading={isLoading}
    >
      Browse Playlists
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='spotify'>
      <WidgetHeader aside={callToAction} isLoading={isLoading}>
        Spotify
      </WidgetHeader>

      <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `auto`, `1fr 70%`] }}>
        <Box>
          <UserProfile isLoading={isLoading} metrics={metrics} />
        </Box>
        <Box>
          <TopTracks isLoading={isLoading} tracks={topTracks} />
        </Box>
      </Grid>
    </Widget>
  )
}

export default SpotifyWidget
