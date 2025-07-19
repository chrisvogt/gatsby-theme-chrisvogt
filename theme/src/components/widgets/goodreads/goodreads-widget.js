/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { faGoodreads } from '@fortawesome/free-brands-svg-icons'

import { getGoodreadsUsername, getGoodreadsWidgetDataSource } from '../../../selectors/metadata'
import {
  getAiSummary,
  getBooks,
  getHasFatalError,
  getIsLoading,
  getMetrics,
  getProfileDisplayName,
  getUserStatus
} from '../../../selectors/goodreads'

import fetchDataSource from '../../../actions/fetchDataSource'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import AiSummary from '../steam/ai-summary'
import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import RecentlyReadBooks from './recently-read-books'
import UserStatus from './user-status'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

export default () => {
  const dispatch = useDispatch()

  const metadata = useSiteMetadata()
  const goodreadsUsername = getGoodreadsUsername(metadata)
  const goodreadsDataSource = getGoodreadsWidgetDataSource(metadata)

  const aiSummary = useSelector(getAiSummary)
  const books = useSelector(getBooks)
  const hasFatalError = useSelector(getHasFatalError)
  const isLoading = useSelector(getIsLoading)
  const metrics = useSelector(getMetrics)
  const profileDisplayName = useSelector(getProfileDisplayName)
  const status = useSelector(getUserStatus)

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchDataSource('goodreads', goodreadsDataSource))
    }
  }, [dispatch, goodreadsDataSource, isLoading])

  const callToAction = (
    <CallToAction
      title={`${goodreadsUsername} on Goodreads`}
      url={`https://www.goodreads.com/${goodreadsUsername}`}
      isLoading={isLoading}
    >
      Visit Profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='goodreads' hasFatalError={hasFatalError}>
      <WidgetHeader aside={callToAction} icon={faGoodreads}>
        Goodreads
      </WidgetHeader>

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />

      {aiSummary && <AiSummary aiSummary={aiSummary} />}

      <RecentlyReadBooks isLoading={isLoading} books={books} />

      <UserStatus actorName={profileDisplayName} isLoading={isLoading} status={status} />
    </Widget>
  )
}
