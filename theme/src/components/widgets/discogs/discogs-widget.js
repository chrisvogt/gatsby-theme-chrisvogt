/** @jsx jsx */
import { jsx } from 'theme-ui'
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import VinylCollection from './vinyl-collection'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import fetchDataSource from '../../../actions/fetchDataSource'
import { getDiscogsWidgetDataSource } from '../../../selectors/metadata'
import { SUCCESS, FAILURE, getDiscogsWidget } from '../../../reducers/widgets'
import { getMetrics, getReleases, getProfileURL } from '../../../selectors/discogs'
import useSiteMetadata from '../../../hooks/use-site-metadata'

const getHasFatalError = state => getDiscogsWidget(state).state === FAILURE

const getIsLoading = state => {
  const widget = getDiscogsWidget(state)
  return !widget.data || widget.state !== SUCCESS
}

const getProviderDisplayName = () => 'Discogs'

const DiscogsWidget = () => {
  const dispatch = useDispatch()

  const metadata = useSiteMetadata()
  const discogsDataSource = getDiscogsWidgetDataSource(metadata)

  const hasFatalError = useSelector(getHasFatalError)
  const isLoading = useSelector(getIsLoading)
  const metrics = useSelector(getMetrics)
  const profileURL = useSelector(getProfileURL)
  const providerDisplayName = useSelector(getProviderDisplayName)
  const releases = useSelector(getReleases)

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchDataSource('discogs', discogsDataSource))
    }
  }, [dispatch, discogsDataSource, isLoading])

  const callToAction = (
    <CallToAction title={`Collection on ${providerDisplayName}`} url={profileURL} isLoading={isLoading}>
      Browse Collection
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='discogs' hasFatalError={hasFatalError}>
      <WidgetHeader aside={callToAction} icon={faRecordVinyl} isLoading={isLoading}>
        Discogs
      </WidgetHeader>

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />

      <VinylCollection isLoading={isLoading} releases={releases} />
    </Widget>
  )
}

export default DiscogsWidget
