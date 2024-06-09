/** @jsx jsx */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import { SUCCESS, FAILURE } from '../../../reducers/widgets'
import fetchDataSource from '../../../actions/fetchDataSource'
import { getSteamWidgetDataSource } from '../../../selectors/metadata'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import { floatOnHover } from '../../../gatsby-plugin-theme-ui/theme'

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
    recentlyPlayedGames: get(
      state,
      'widgets.steam.data.collections.recentlyPlayedGames',
      []
    )
  }))

  const callToAction = (
    <CallToAction
      title={`${profileDisplayName} on Steam`}
      url={profileURL}
      isLoading={isLoading}
    >
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

      <div sx={{ display: `flex`, flex: 1, alignItems: `center` }}>
        <Heading as='h3'>Recently Played Games</Heading>
      </div>

      <p>Games I've played in the last two weeks.</p>

      <div
        sx={{
          display: `grid`,
          gridGap: [3, 2, 2, 3],
          gridTemplateColumns: [`repeat(2, 1fr)`, `repeat(3, 1fr)`]
        }}
      >
        {recentlyPlayedGames.map(({ displayName, logoURL, playTime2Weeks }) => (
          <div>
            <span
              sx={{
                display: `block`,
                textOverflow: `ellipsis`,
                whiteSpace: `nowrap`
              }}
            >
              <strong>{displayName}</strong>
            </span>
            <span sx={{ display: `block` }}>{playTime2Weeks} minutes</span>
            <img
              alt={`Game artwork for ${displayName}`}
              src={logoURL}
              width={184}
              height={69}
              sx={{
                ...floatOnHover,
                boxShadow: `md`,
                borderRadius: `4px`,
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>
    </Widget>
  )
}

export default SteamWidget
