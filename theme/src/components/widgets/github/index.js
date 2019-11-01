/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui'
import { Grid, Heading } from '@theme-ui/components'

import LastPullRequest from './last-pull-request'
import PinnedItems from './pinned-items'
import UserProfile from './user-profile'

import { getGithubUsername } from '../../../selectors/metadata'
import getPinnedItems from './selectors/get-pinned-items'
import getPullRequest from './selectors/get-pull-request'
import getUser from './selectors/get-user'
import useSiteMetadata from '../../../hooks/use-site-metadata'
import useWidgetContent from '../../../hooks/use-widget-content'

export default () => {
  const metadata = useSiteMetadata()
  const githubUsername = getGithubUsername(metadata)

  const { isLoading, content } = useWidgetContent()

  let pinnedItems
  let pullRequest
  let user

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
      <Heading sx={{ mb: 3 }}>GitHub</Heading>
      <Grid gap={4} sx={{ gridTemplateColumns: [`auto`, `1fr 70%`] }}>
        <div>
          <UserProfile user={user} isLoading={isLoading} />
        </div>
        <div>
          <PinnedItems pinnedItems={pinnedItems} />
          <LastPullRequest pullRequest={pullRequest} isLoading={isLoading} />
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
