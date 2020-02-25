/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'

import { getGoodreadsUsername } from '../../../selectors/metadata'
import useGoodreadsUser from '../../../hooks/use-goodreads-user'
import useRecentBooks from '../../../hooks/use-recent-books'
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
  const { isLoadingBooks, books } = useRecentBooks()
  const { isLoadingUser, user } = useGoodreadsUser()
  const { profile = {}, updates = [] } = user
  const status = getStatusFromUpdates(updates)
  const metadata = useSiteMetadata()
  const goodreadsUsername = getGoodreadsUsername(metadata)
  const profileURL = `https://www.goodreads.com/${goodreadsUsername}`

  return (
    <Widget id='goodreads'>
      <WidgetHeader>Goodreads</WidgetHeader>

      <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `1fr 70%`] }}>
        <Box>
          <UserProfile isLoading={isLoadingUser} profile={profile} />
        </Box>
        <Box>
          <RecentlyReadBooks isLoading={isLoadingBooks} books={books} />
          <UserStatus
            actorName={profile.name}
            isLoading={isLoadingUser}
            status={status}
          />
        </Box>
      </Grid>

      <CallToAction
        title={`${goodreadsUsername} on Goodreads`}
        url={profileURL}
      >
        Goodreads profile &rarr;
      </CallToAction>
    </Widget>
  )
}
