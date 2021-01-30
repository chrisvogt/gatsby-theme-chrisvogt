/** @jsx jsx */
import get from 'lodash/get'
import { jsx } from 'theme-ui'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CallToAction from '../call-to-action'
import Playlists from './playlists'
import ProfileMetricsBadge from '../profile-metrics-badge'
import TopTracks from './top-tracks'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import fetchDataSource from '../../../actions/fetchDataSource'
import { getSpotifyWidgetDataSource } from '../../../selectors/metadata'
import selectMetricsPayload from '../../../selectors/selectMetricsPayload'
import useSiteMetadata from '../../../hooks/use-site-metadata'

const SpotifyWidget = () => {
  const dispatch = useDispatch()
  const metadata = useSiteMetadata()
  const spotifyDataSource = getSpotifyWidgetDataSource(metadata)

  useEffect(() => {
    dispatch(fetchDataSource('spotify', spotifyDataSource, selectMetricsPayload))
  }, [dispatch, spotifyDataSource])

  const {
    isLoading,
    playlists,
    topTracks,
    metrics,
    profileDisplayName,
    profileURL,
    providerDisplayName
  } = useSelector(state => ({
    isLoading: get(state, 'widgets.github.state') !== 'SUCCESS',
    playlists: get(state, 'widgets.spotify.data.collections.playlists', []),
    topTracks: get(state, 'widgets.spotify.data.collections.topTracks', []),
    metrics: get(state, 'widgets.spotify.data.metrics', []),
    profileDisplayName: get(state, 'widgets.spotify.data.profile.displayName', ''),
    profileURL: get(state, 'widgets.spotify.data.profile.profileURL', ''),
    providerDisplayName: get(state, 'widgets.spotify.data.provider.displayName', '')
  }))

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

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />
      <Playlists isLoading={isLoading} playlists={playlists} />
      <TopTracks isLoading={isLoading} tracks={topTracks} />
    </Widget>
  )
}

export default SpotifyWidget
