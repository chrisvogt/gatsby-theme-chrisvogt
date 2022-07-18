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
import { SUCCESS, FAILURE } from '../../../reducers/widgets'
import useSiteMetadata from '../../../hooks/use-site-metadata'

const SpotifyWidget = () => {
  const dispatch = useDispatch()
  const metadata = useSiteMetadata()
  const spotifyDataSource = getSpotifyWidgetDataSource(metadata)

  const {
    hasFatalError,
    isLoading,
    metrics,
    playlists,
    profileDisplayName,
    profileURL,
    providerDisplayName,
    topTracks
  } = useSelector(state => ({
    hasFatalError: get(state, 'widgets.spotify.state') === FAILURE,
    isLoading: get(state, 'widgets.spotify.state') !== SUCCESS,
    metrics: get(state, 'widgets.spotify.data.metrics', []),
    playlists: get(state, 'widgets.spotify.data.collections.playlists', []),
    profileDisplayName: get(
      state,
      'widgets.spotify.data.profile.displayName',
      ''
    ),
    profileURL: get(state, 'widgets.spotify.data.profile.profileURL', ''),
    providerDisplayName: get(
      state,
      'widgets.spotify.data.provider.displayName',
      ''
    ),
    topTracks: get(state, 'widgets.spotify.data.collections.topTracks', [])
  }))

  useEffect(() => {
    if (isLoading) {
      dispatch(
        fetchDataSource('spotify', spotifyDataSource, selectMetricsPayload)
      )
    }
  }, [dispatch, spotifyDataSource, isLoading])

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
    <Widget id='spotify' hasFatalError={hasFatalError}>
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
