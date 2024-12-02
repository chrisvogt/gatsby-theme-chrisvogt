/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { faGoodreads } from '@fortawesome/free-brands-svg-icons'

import { getGoodreadsUsername, getGoodreadsWidgetDataSource } from '../../../selectors/metadata'
import { SUCCESS, FAILURE, getGoodreadsWidget } from '../../../reducers/widgets'

import fetchDataSource from '../../../actions/fetchDataSource'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import RecentlyReadBooks from './recently-read-books'
import UserStatus from './user-status'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

const getBooks = state => {
  const booksCollection = getGoodreadsWidget(state).data?.collections?.recentlyReadBooks

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
  const friendsCount = getGoodreadsWidget(state).data?.profile?.friendsCount
  const readCount = getGoodreadsWidget(state).data?.profile?.readCount

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
  const updates = getGoodreadsWidget(state).data?.collections?.updates

  if (!updates?.length) {
    return {}
  }

  const userStatus = updates.find(({ type }) => type === 'userstatus' || type === 'review')

  return userStatus
}

const getHasFatalError = state => getGoodreadsWidget(state).state === FAILURE
const getIsLoading = state => getGoodreadsWidget(state).state !== SUCCESS
const getProfileDisplayName = state => getGoodreadsWidget(state).data?.profile?.name

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
      <WidgetHeader aside={callToAction} icon={faGoodreads}>
        Goodreads
      </WidgetHeader>

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />

      <RecentlyReadBooks isLoading={isLoading} books={books} />

      <UserStatus actorName={profileDisplayName} isLoading={isLoading} status={status} />
    </Widget>
  )
}
