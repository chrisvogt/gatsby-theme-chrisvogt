/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui'
import { Grid, Heading } from '@theme-ui/components'

import LastPullRequest from './last-pull-request'
import PinnedRepositories from './pinned-repositories'
import UserProfile from './user-profile'

import { getGithubUsername } from '../../../selectors/metadata'
import getPinnedRepositories from './utils/get-pinned-repositories'
import getPullRequest from './utils/get-pull-request'
import getUser from './utils/get-user'
import useSiteMetadata from '../../../hooks/use-site-metadata'
import useWidgetContent from '../../../hooks/use-widget-content'

export default () => {
  const metadata = useSiteMetadata()
  const githubUsername = getGithubUsername(metadata)

  const { isLoading, content } = useWidgetContent()

  const pinnedRepositories = !isLoading && getPinnedRepositories(content)
  const pullRequest = !isLoading && getPullRequest(content)
  const user = !isLoading && getUser(content)

  if (!isLoading) {
    console.log(content)
  }

  return (
    <Container
      id='github'
      sx={{
        mb: 4,
        variant: `styles.Widget`
      }}
    >
      <Heading sx={{ mb: 3 }}>GitHub</Heading>
      <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `1fr 70%`] }}>
        <div>
          <UserProfile user={user} />
        </div>
        <div>
          <PinnedRepositories pinnedRepositories={pinnedRepositories} />
          <LastPullRequest pullRequest={pullRequest} />
          <p sx={{ marginTop: 4, textAlign: `right` }}>
            <Styled.a
              href={`https://www.github.com/${githubUsername}`}
              sx={{ fontFamily: `heading`, fontSize: 3 }}
              title={`${githubUsername} on GitHub`}
            >
              View GitHub profile &raquo;
            </Styled.a>
          </p>
        </div>
      </Grid>
    </Container>
  )
}
