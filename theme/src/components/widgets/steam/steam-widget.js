/** @jsx jsx */
import { jsx } from 'theme-ui'
import { faSteam } from '@fortawesome/free-brands-svg-icons'
import { Fragment, useEffect } from 'react'
import { get } from 'lodash'
import { Heading } from '@theme-ui/components'
import { Themed } from '@theme-ui/mdx'
import { useDispatch, useSelector } from 'react-redux'
import humanizeDuration from 'humanize-duration'
import React from 'react'

import CallToAction from '../call-to-action'
import PostCard from '../recent-posts/post-card'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'
import OwnedGamesTable from './owned-games-table'

import { SUCCESS, FAILURE, getSteamWidget } from '../../../reducers/widgets'
import fetchDataSource from '../../../actions/fetchDataSource'
import { getSteamWidgetDataSource } from '../../../selectors/metadata'
import useSiteMetadata from '../../../hooks/use-site-metadata'

export const TimeSpent = ({ timeInMs }) => (
  <Fragment>{humanizeDuration(timeInMs, { units: ['h'], round: true })}</Fragment>
)

const EMPTY_ARRAY = []

const getHasFatalError = state => getSteamWidget(state).state === FAILURE
const getIsLoading = state => getSteamWidget(state).state !== SUCCESS

const SteamWidget = React.memo(() => {
  const dispatch = useDispatch()
  const metadata = useSiteMetadata()
  const steamDataSource = getSteamWidgetDataSource(metadata)

  const hasFatalError = useSelector(getHasFatalError)
  const isLoading = useSelector(getIsLoading)
  const metrics = useSelector(state => get(state, 'widgets.steam.data.metrics') ?? EMPTY_ARRAY)
  const profileDisplayName = useSelector(state => get(state, 'widgets.steam.data.profile.displayName'))
  const profileURL = useSelector(state => get(state, 'widgets.steam.data.profile.profileURL'))
  const recentlyPlayedGames = useSelector(
    state => get(state, 'widgets.steam.data.collections.recentlyPlayedGames') ?? EMPTY_ARRAY
  )
  const ownedGames = useSelector(state => get(state, 'widgets.steam.data.collections.ownedGames') ?? EMPTY_ARRAY)

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchDataSource('steam', steamDataSource))
    }
  }, [dispatch, steamDataSource, isLoading])

  const callToAction = (
    <CallToAction title={`${profileDisplayName} on Steam`} url={profileURL} isLoading={isLoading}>
      Visit Profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  return (
    <Widget id='steam' hasFatalError={hasFatalError}>
      <WidgetHeader aside={callToAction} icon={faSteam} isLoading={isLoading}>
        Steam
      </WidgetHeader>

      <ProfileMetricsBadge isLoading={isLoading} metrics={metrics} />

      {/* My Games Section */}
      <div sx={{ display: 'flex', flex: 1, alignItems: 'center', mb: 3 }}>
        <Heading as='h3' sx={{ fontSize: [3, 4] }}>
          My Games
        </Heading>
      </div>

      <Themed.p sx={{ mb: 4 }}>Games I own and their play time statistics.</Themed.p>

      <OwnedGamesTable games={ownedGames} />

      {/* Recently-Played Games Section */}
      <div sx={{ display: 'flex', flex: 1, alignItems: 'center', mt: 5, mb: 3 }}>
        <Heading as='h3' sx={{ fontSize: [3, 4] }}>
          Recently-Played Games
        </Heading>
      </div>

      <Themed.p sx={{ mb: 4 }}>Games I've played in the last two weeks.</Themed.p>

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
})

export default SteamWidget
