/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'

import CallToAction from '../call-to-action'
import LastPullRequest from './last-pull-request'
import PinnedItems from './pinned-items'
import UserProfile from './user-profile'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import { getGithubUsername } from '../../../selectors/metadata'
import getPinnedItems from './selectors/get-pinned-items'
import getPullRequests from './selectors/get-pull-requests'
import getUser from './selectors/get-user'
import useSiteMetadata from '../../../hooks/use-site-metadata'
import useWidgetContent from '../../../hooks/use-widget-content'

const GitHubWidget = () => {
  const metadata = useSiteMetadata()
  const githubUsername = getGithubUsername(metadata)

  const { isLoading, content } = useWidgetContent('github')

  let pinnedItems = []
  let pullRequest = {}
  let user = {}

  if (!isLoading) {
    pinnedItems = getPinnedItems(content)
    pullRequest = getPullRequests(content)
    user = getUser(content)
  }

  const callToAction = (
    <CallToAction
      title={`${githubUsername} on GitHub`}
      url={`https://www.github.com/${githubUsername}`}
      isLoading={isLoading}
    >
      View profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='github'>
      <WidgetHeader aside={callToAction}>GitHub</WidgetHeader>

      <Grid gap={3} sx={{ gridTemplateColumns: [`auto`, `auto`, `1fr 70%`] }}>
        <Box>
          <UserProfile isLoading={isLoading} user={user} />
        </Box>
        <Box>
          <PinnedItems isLoading={isLoading} pinnedItems={pinnedItems} />
          <LastPullRequest isLoading={isLoading} pullRequest={pullRequest} />
        </Box>
      </Grid>
    </Widget>
  )
}

/**
 * The container component for the GitHub widget.
 */
export default GitHubWidget
