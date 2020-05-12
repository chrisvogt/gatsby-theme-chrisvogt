/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'
import { Bars } from 'svg-loaders-react'

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

  const callToAction = isLoading ? (
    <Bars
      fill='#1E90FF'
      width='24'
      height='24'
      sx={{ verticalAlign: `middle` }}
    />
  ) : (
    <CallToAction
      title={`${profileDisplayName} on ${providerDisplayName}`}
      url={profileURL}
    >
      View profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='spotify'>
      <WidgetHeader aside={callToAction}>Spotify</WidgetHeader>

      <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `1fr 70%`] }}>
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
