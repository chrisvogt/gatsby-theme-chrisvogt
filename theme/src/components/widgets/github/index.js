/** @jsx jsx */
import { Container, jsx } from 'theme-ui'
import { Box, Grid } from '@theme-ui/components'

import CallToAction from '../call-to-action'
import LastPullRequest from './last-pull-request'
import PinnedItems from './pinned-items'
import UserProfile from './user-profile'

import { getGithubUsername } from '../../../selectors/metadata'
import getPinnedItems from './selectors/get-pinned-items'
import getPullRequest from './selectors/get-pull-request'
import getUser from './selectors/get-user'
import useSiteMetadata from '../../../hooks/use-site-metadata'
import useWidgetContent from '../../../hooks/use-widget-content'
import WidgetHeader from '../widget-header'

const transformPullRequestToProps = ({
  number,
  repository: { name } = {},
  title,
  url
}) => ({
  number,
  repositoryName: name,
  title,
  url
})

const GitHubWidget = () => {
  const metadata = useSiteMetadata()
  const githubUsername = getGithubUsername(metadata)

  const { isLoading, content } = useWidgetContent()

  let pinnedItems = []
  let pullRequest = {}
  let user = {}

  if (!isLoading) {
    pinnedItems = getPinnedItems(content)
    pullRequest = getPullRequest(content)
    user = getUser(content)
  }

  return (
    <Container
      id='github'
      sx={{
        mb: 4,
        variant: `styles.Widget`
      }}
    >
      <WidgetHeader>GitHub</WidgetHeader>

      <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `1fr 70%`] }}>
        <Box>
          <UserProfile isLoading={isLoading} user={user} />
        </Box>
        <Box>
          <PinnedItems isLoading={isLoading} pinnedItems={pinnedItems} />
          <LastPullRequest
            isLoading={isLoading}
            {...transformPullRequestToProps(pullRequest)}
          />
        </Box>
      </Grid>

      <CallToAction
        title={`${githubUsername} on GitHub`}
        url={`https://www.github.com/${githubUsername}`}
      >
        View GitHub profile &raquo;
      </CallToAction>
    </Container>
  )
}

/**
 * The container component for the GitHub widget.
 */
export default GitHubWidget
