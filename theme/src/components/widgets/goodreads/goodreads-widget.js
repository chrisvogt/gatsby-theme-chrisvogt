/** @jsx jsx */
import { jsx } from 'theme-ui'

import {
  getGoodreadsUsername,
  getGoodreadsWidgetDataSource
} from '../../../selectors/metadata'

import useDataSource from '../../../hooks/use-data-source'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import RecentlyReadBooks from './recently-read-books'
import ProfileMetricsBadge from '../profile-metrics-badge'
import UserStatus from './user-status'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

const getStatusFromUpdates = updates =>
  updates.length > 0
    ? updates.find(({ type }) => type === 'userstatus' || type === 'review')
    : {}

export default () => {
  const metadata = useSiteMetadata()

  const goodreadsUsername = getGoodreadsUsername(metadata)
  const dataSource = getGoodreadsWidgetDataSource(metadata)

  const { isLoading, data } = useDataSource(dataSource)

  const {
    profile: { friendsCount, name: profileName, readCount } = {},
    updates = [],
    recentlyReadBooks = []
  } = data

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

  const books =
    recentlyReadBooks.length &&
    recentlyReadBooks.filter(({ thumbnail }) => Boolean(thumbnail)).slice(0, 12)

  const status = updates.length && getStatusFromUpdates(updates)

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
        actorName={profileName}
        isLoading={isLoading}
        status={status}
      />
    </Widget>
  )
}
