/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'

import {
  getGoodreadsUsername,
  getGoodreadsWidgetDataSource,
} from '../../../selectors/metadata'

import useDataSource from '../../../hooks/use-data-source'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import RecentlyReadBooks from './recently-read-books'
import UserProfile from './user-profile'
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

  const { profile = {}, updates = [], recentlyReadBooks = [] } = data

  const books = recentlyReadBooks.length && recentlyReadBooks
    .filter(({ thumbnail }) => Boolean(thumbnail))
    .slice(0, 12)

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

      <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `auto`, `1fr 70%`] }}>
        <Box>
          <UserProfile isLoading={isLoading} profile={profile} />
        </Box>
        <Box>
          <RecentlyReadBooks isLoading={isLoading} books={books} />
          <UserStatus
            actorName={profile.name}
            isLoading={isLoading}
            status={status}
          />
        </Box>
      </Grid>
    </Widget>
  )
}
