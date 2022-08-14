/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { getGoodreadsUsername, getGoodreadsWidgetDataSource } from '../../../selectors/metadata'
import { SUCCESS, FAILURE } from '../../../reducers/widgets'

import fetchDataSource from '../../../actions/fetchDataSource'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import RecentlyReadBooks from './recently-read-books'
import UserStatus from './user-status'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

const getBooks = state => {
  const booksCollection = state.widgets?.goodreads?.data?.collections?.recentlyReadBooks

  if (!booksCollection?.length) {
    return []
  }

  const books = booksCollection
    // NOTE(chrisvogt): only select books with thumbnails, since we render those
    // into image elements
    .filter(({ thumbnail }) => Boolean(thumbnail))
    .slice(0, 12)

  return books
}

const getMetrics = state => {
  const friendsCount = state.widgets?.goodreads?.data?.profile?.friendsCount
  const readCount = state.widgets?.goodreads?.data?.profile?.readCount

  return [
    ...(friendsCount
      ? [
          {
            displayName: 'Friends',
            id: 'friends-count',
            value: friendsCount
          }
        ]
      : []),
    ...(readCount
      ? [
          {
            displayName: 'Books Read',
            id: 'read-count',
            value: readCount
          }
        ]
      : [])
  ]
}

const getUserStatus = state => {
  const updates = state.widgets?.goodreads?.data?.collections?.updates

  if (!updates?.length) {
    return {}
  }

  const userStatus = updates.find(({ type }) => type === 'userstatus' || type === 'review')

  return userStatus
}

const getHasFatalError = state => state.widgets?.goodreads?.state === FAILURE
const getIsLoading = state => state.widgets?.goodreads?.state !== SUCCESS
const getProfileDisplayName = state => state.widgets?.goodreads?.data?.profile?.name

export default () => {
  const dispatch = useDispatch()

  const metadata = useSiteMetadata()
  const goodreadsUsername = getGoodreadsUsername(metadata)
  const goodreadsDataSource = getGoodreadsWidgetDataSource(metadata)

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
      <WidgetHeader aside={callToAction}>Goodreads</WidgetHeader>

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />

      <RecentlyReadBooks isLoading={isLoading} books={books} />

      <UserStatus actorName={profileDisplayName} isLoading={isLoading} status={status} />
    </Widget>
  )
}
