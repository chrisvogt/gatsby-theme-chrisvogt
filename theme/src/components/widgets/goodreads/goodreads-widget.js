/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import get from 'lodash/get'

import {
  getGoodreadsUsername,
  getGoodreadsWidgetDataSource
} from '../../../selectors/metadata'

import fetchDataSource from '../../../actions/fetchDataSource'
import selectMetricsPayload from '../../../selectors/selectMetricsPayload'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import RecentlyReadBooks from './recently-read-books'
import UserStatus from './user-status'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

const WIDGET_ID = 'goodreads'

const getBooks = state => {
  const booksCollection = get(
    state,
    'widgets.dataSources.goodreads.data.collections.recentlyReadBooks',
    []
  )

  if (!booksCollection.length) {
    return {}
  }

  const books = booksCollection
    // NOTE(chrisvogt): only select books with thumbnails, since we render those
    // into image elements
    .filter(({ thumbnail }) => Boolean(thumbnail))
    .slice(0, 12)

  return books
}

const getMetrics = state => {
  const friendsCount = get(
    state,
    'widgets.dataSources.goodreads.data.profile.friendsCount'
  )
  const readCount = get(
    state,
    'widgets.dataSources.goodreads.data.profile.readCount'
  )

  const metrics = [
    {
      displayName: 'Friends',
      id: 'friends-count',
      value: friendsCount
    },
    {
      displayName: 'Books Read',
      id: 'read-count',
      value: readCount
    }
  ]

  return metrics
}

const getUserStatus = state => {
  const updates = get(
    state,
    'widgets.dataSources.goodreads.data.collections.updates',
    []
  )

  if (!updates.length) {
    return {}
  }

  const userStatus = updates.find(
    ({ type }) => type === 'userstatus' || type === 'review'
  )

  return userStatus
}

export default () => {
  const dispatch = useDispatch()
  const metadata = useSiteMetadata()
  const goodreadsUsername = getGoodreadsUsername(metadata)
  const goodreadsDataSource = getGoodreadsWidgetDataSource(metadata)

  useEffect(() => {
    dispatch(
      fetchDataSource(WIDGET_ID, goodreadsDataSource, selectMetricsPayload)
    )
  }, [dispatch, goodreadsDataSource])

  const { books, isLoading, metrics, profileDisplayName, status } = useSelector(
    state => ({
      books: getBooks(state),
      isLoading: get(state, 'widgets.dataSources.github.state') !== 'SUCCESS',
      metrics: getMetrics(state),
      profileDisplayName: get(
        state,
        'widgets.dataSources.goodreads.data.profile.name'
      ),
      status: getUserStatus(state)
    })
  )

  // const { isLoading, data } = useDataSource(dataSource)

  // const {
  //   collections: {
  //     updates = [],
  //     recentlyReadBooks = []
  //   } = {},
  //   profile: { friendsCount, name: profileName, readCount } = {}
  // } = data

  // const books =
  //   recentlyReadBooks.length &&
  //   recentlyReadBooks.filter(({ thumbnail }) => Boolean(thumbnail)).slice(0, 12)

  // const status = updates.length ? getStatusFromUpdates(updates) : {}

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
    <Widget id='goodreads'>
      <WidgetHeader aside={callToAction}>Goodreads</WidgetHeader>

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />

      <RecentlyReadBooks isLoading={isLoading} books={books} />

      <UserStatus
        actorName={profileDisplayName}
        isLoading={isLoading}
        status={status}
      />
    </Widget>
  )
}
