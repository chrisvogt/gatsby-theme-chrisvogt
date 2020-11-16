/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react'
import { Box, Grid } from '@theme-ui/components'

import CallToAction from '../call-to-action'
import LastPullRequest from './last-pull-request'
import PinnedItems from './pinned-items'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import {
  getGithubUsername,
  getGithubWidgetDataSource
} from '../../../selectors/metadata'
import selectPinnedItems from './selectors/get-pinned-items'
import selectPullRequests from './selectors/get-pull-requests'
import selectUser from './selectors/get-user'

import useDataSource from '../../../hooks/use-data-source'
import useSiteMetadata from '../../../hooks/use-site-metadata'

const GitHubWidget = () => {
  const metadata = useSiteMetadata()
  const githubUsername = getGithubUsername(metadata)
  const githubDataSource = getGithubWidgetDataSource(metadata)

  const { isLoading, data } = useDataSource(githubDataSource)

  const [latestPullRequest, setLatestPullRequests] = useState({})
  const [metrics, setMetrics] = useState([])
  const [pinnedItems, setPinnedItems] = useState([])

  useEffect(() => {
    if (isLoading) {
      return
    }

    const pinnedItems = selectPinnedItems(data)
    const pullRequest = selectPullRequests(data)

    setLatestPullRequests(pullRequest)
    setPinnedItems(pinnedItems)

    const {
      followers: { totalCount: totalFollowersCount = 0 } = {},
      following: { totalCount: totalFollowingCount = 0 } = {}
    } = selectUser(data) || {}
  
    const metrics = [
      {
        displayName: 'Followers',
        id: 'followers',
        value: totalFollowersCount
      },
      {
        displayName: 'Following',
        id: 'following',
        value: totalFollowingCount
      }
    ]

    setMetrics(metrics)
  })

  const callToAction = (
    <CallToAction
      title={`${githubUsername} on GitHub`}
      url={`https://www.github.com/${githubUsername}`}
      isLoading={isLoading}
    >
      Visit Profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='github'>
      <WidgetHeader aside={callToAction}>GitHub</WidgetHeader>
      <ProfileMetricsBadge metrics={ metrics } />
      <PinnedItems items={pinnedItems} />
      <LastPullRequest isLoading={isLoading} pullRequest={latestPullRequest} />
    </Widget>
  )
}

/**
 * The container component for the GitHub widget.
 */
export default GitHubWidget
