/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '@theme-ui/components'

import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'

import useSiteMetadata from '../../../hooks/use-site-metadata'
import useDataSource from '../../../hooks/use-data-source'
import { getSteamWidgetDataSource } from '../../../selectors/metadata'

import { floatOnHover } from '../../../gatsby-plugin-theme-ui/abstracts/shadows'

const SteamWidget = () => {
  const metadata = useSiteMetadata()
  const steamDataSource = getSteamWidgetDataSource(metadata)
  const { isLoading, data: content } = useDataSource(steamDataSource)

  const {
    collections: { recentlyPlayedGames = [] } = {},
    metrics,
    profile: { displayName: profileDisplayName, profileURL } = {}
  } = content

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
