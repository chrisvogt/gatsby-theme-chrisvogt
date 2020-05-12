/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'
import { Bars } from 'svg-loaders-react'

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
  const [isLoadingBooks, books] = useRecentBooks()
  const [isLoadingUser, user] = useGoodreadsUser()
  const isLoading = isLoadingBooks || isLoadingUser

  const { profile = {}, updates = [] } = user

  const status = getStatusFromUpdates(updates)
  const metadata = useSiteMetadata()
  const goodreadsUsername = getGoodreadsUsername(metadata)

  const callToAction = isLoading ? (
    <Bars
      fill='#1E90FF'
      width='24'
      height='24'
      sx={{ verticalAlign: `middle` }}
    />
  ) : (
    <CallToAction
      title={`${goodreadsUsername} on Goodreads`}
      url={`https://www.goodreads.com/${goodreadsUsername}`}
    >
      View profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='goodreads'>
      <WidgetHeader aside={callToAction}>Goodreads</WidgetHeader>

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
    </Widget>
  )
}
