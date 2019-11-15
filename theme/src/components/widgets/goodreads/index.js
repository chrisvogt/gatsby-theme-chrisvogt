/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'

import { getGoodreadsUsername } from '../../../selectors/metadata'
import useGoodreadsUser from '../../../hooks/use-goodreads-user'
import useRecentBooks from '../../../hooks/use-recent-books'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import CallToAction from '../call-to-action'
import UserStatus from './user-status'
import RecentlyReadBooks from './recently-read-books'
import UserProfile from './user-profile'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

export default () => {
  const { isLoadingBooks, books } = useRecentBooks()
  const { isLoadingUser, user } = useGoodreadsUser()
  const metadata = useSiteMetadata()

  const goodreadsUsername = getGoodreadsUsername(metadata)
  const { profile = {}, updates = [] } = user
  const status =
    updates.length > 0
      ? updates.find(update => update.type === 'userstatus')
      : {}

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
            isLoading={isLoadingUser}
            actorName={profile.name}
            status={status}
          />
        </Box>
      </Grid>

      <CallToAction
        title={`${goodreadsUsername} on Goodreads`}
        url={`https://www.goodreads.com/${goodreadsUsername}`}
      >
        View Goodreads profile &raquo;
      </CallToAction>
    </Widget>
  )
}
