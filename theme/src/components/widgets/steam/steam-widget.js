/** @jsx jsx */
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'
import { Themed } from '@theme-ui/mdx'
import humanizeDuration from 'humanize-duration'

import CallToAction from '../call-to-action'
import PostCard from '../recent-posts/post-card'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import { SUCCESS } from '../../../reducers/widgets'
import fetchDataSource from '../../../actions/fetchDataSource'
import { getSteamWidgetDataSource } from '../../../selectors/metadata'
import useSiteMetadata from '../../../hooks/use-site-metadata'

const TimeSpent = ({ timeInMs }) => (
  <Fragment>
    <b>Time Spent:</b> {humanizeDuration(timeInMs)}
  </Fragment>
)

const SteamWidget = () => {
  const dispatch = useDispatch()
  const metadata = useSiteMetadata()
  const steamDataSource = getSteamWidgetDataSource(metadata)

  useEffect(() => {
    dispatch(fetchDataSource('steam', steamDataSource))
  }, [dispatch, steamDataSource])

  const {
    // hasFatalError,
    isLoading,
    metrics,
    profileDisplayName,
    profileURL,
    recentlyPlayedGames
  } = useSelector(state => ({
    // hasFatalError: get(state, 'widgets.steam.state') === FAILURE,
    isLoading: get(state, 'widgets.steam.state') !== SUCCESS,
    metrics: get(state, 'widgets.steam.data.metrics', []),
    profile: get(state, 'widgets.steam.data.profile'),
    profileDisplayName: get(state, 'widgets.steam.data.profile.displayName'),
    profileURL: get(state, 'widgets.steam.data.profile.profileURL'),
    recentlyPlayedGames: get(state, 'widgets.steam.data.collections.recentlyPlayedGames', [])
  }))

  const callToAction = (
    <CallToAction title={`${profileDisplayName} on Steam`} url={profileURL} isLoading={isLoading}>
      Visit Profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='steam'>
      <WidgetHeader aside={callToAction} isLoading={isLoading}>
        Steam
      </WidgetHeader>

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />

      <div sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <Heading as='h3' sx={{ fontSize: [3, 4] }}>
          Recently-Played Games
        </Heading>
      </div>

      <Themed.p>Games I've played in the last two weeks.</Themed.p>

      <div
        sx={{
          display: 'grid',
          gridGap: [3, 2, 2, 3],
          gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)']
        }}
      >
        {recentlyPlayedGames.map(game => (
          <PostCard
            banner={game.images?.header}
            date={<TimeSpent timeInMs={game.playTime2Weeks * 60 * 1000} />}
            key={game.id}
            link={`https://store.steampowered.com/app/${game.id}`}
            title={game.displayName}
          />
        ))}
      </div>
    </Widget>
  )
}

export default SteamWidget
