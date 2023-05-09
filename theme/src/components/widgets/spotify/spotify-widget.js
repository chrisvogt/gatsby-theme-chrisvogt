/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import CallToAction from '../call-to-action'
import Playlists from './playlists'
import ProfileMetricsBadge from '../profile-metrics-badge'
import TopTracks from './top-tracks'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import fetchDataSource from '../../../actions/fetchDataSource'
import { getSpotifyWidgetDataSource } from '../../../selectors/metadata'
import { SUCCESS, FAILURE, getSpotifyWidget } from '../../../reducers/widgets'
import useSiteMetadata from '../../../hooks/use-site-metadata'

const getHasFatalError = state => getSpotifyWidget(state).state === FAILURE
const getIsLoading = state => getSpotifyWidget(state).state !== SUCCESS
const getMetrics = state => getSpotifyWidget(state).data?.metrics || []
const getPlaylists = state => getSpotifyWidget(state).data?.collections?.playlists || []
const getProfileDisplayName = state => getSpotifyWidget(state).data?.profile?.displayName || ''
const getProfileURL = state => getSpotifyWidget(state).data?.profile?.profileURL || ''
const getProviderDisplayName = state => getSpotifyWidget(state).data?.provider?.displayName || ''
const getTopTracks = state => getSpotifyWidget(state).data?.collections?.topTracks || []

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
    <CallToAction title={`${profileDisplayName} on ${providerDisplayName}`} url={profileURL} isLoading={isLoading}>
      Browse Playlists
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='spotify' hasFatalError={hasFatalError}>
      <WidgetHeader
        aside={callToAction}
        icon={faSpotify}
        isLoading={isLoading}
      >
        Spotify
      </WidgetHeader>

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />
      <Playlists isLoading={isLoading} playlists={playlists} />
      <TopTracks isLoading={isLoading} tracks={topTracks} />
    </Widget>
  )
}

export default SpotifyWidget
