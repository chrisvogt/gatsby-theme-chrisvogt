/** @jsx jsx */
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
import { SUCCESS, FAILURE } from '../../../reducers/widgets'
import useSiteMetadata from '../../../hooks/use-site-metadata'

const getHasFatalError = state => state.widgets?.spotify?.state === FAILURE
const getIsLoading = state => state.widgets?.spotify?.state !== SUCCESS
const getMetrics = state => state.widgets?.spotify?.data?.metrics || []
const getPlaylists = state =>
  state.widgets?.spotify?.data?.collections?.playlists || []
const getProfileDisplayName = state =>
  state.widgets?.spotify?.data?.profile?.displayName || ''
const getProfileURL = state =>
  state.widgets?.spotify?.data?.profile?.profileURL || ''
const getProviderDisplayName = state =>
  state.widgets?.spotify?.data?.provider?.displayName || ''
const getTopTracks = state =>
  state.widgets?.spotify?.data?.collections?.topTracks || []

const SpotifyWidget = () => {
  const dispatch = useDispatch()

  const metadata = useSiteMetadata()
  const spotifyDataSource = getSpotifyWidgetDataSource(metadata)

  const hasFatalError = useSelector(getHasFatalError)
  const isLoading = useSelector(getIsLoading)
  const metrics = useSelector(getMetrics)
  const playlists = useSelector(getPlaylists)
  const profileDisplayName = useSelector(getProfileDisplayName)
  const profileURL = useSelector(getProfileURL)
  const providerDisplayName = useSelector(getProviderDisplayName)
  const topTracks = useSelector(getTopTracks)

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchDataSource('spotify', spotifyDataSource))
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
