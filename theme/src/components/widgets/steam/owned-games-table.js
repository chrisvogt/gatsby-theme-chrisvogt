/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Themed } from '@theme-ui/mdx'
import humanizeDuration from 'humanize-duration'

import ViewExternal from '../view-external'

export const TimeSpent = ({ timeInMs }) => (
  <Fragment>{humanizeDuration(timeInMs, { units: ['h'], round: true })}</Fragment>
)

const OwnedGamesTable = ({ games = [] }) => {
  if (!games || games.length === 0) {
    return (
      <Themed.p sx={{ textAlign: 'center', fontStyle: 'italic', color: 'textMuted' }}>No owned games found.</Themed.p>
    )
  }

  const totalGames = games.length
  const displayedGames = games.slice(0, 10) // Show first 10 games
  const remainingGames = totalGames - displayedGames.length

  return (
    <Themed.table sx={{ variant: 'styles.table' }}>
      <thead>
        <tr>
          <th>Game</th>
          <th>Total Play Time</th>
          <th>Recent Play Time</th>
        </tr>
      </thead>
      <tbody>
        {displayedGames.map(game => (
          <tr key={game.id}>
            <td>
              <div sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img
                  src={game.images?.icon}
                  alt={`${game.displayName} icon`}
                  sx={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    objectFit: 'cover'
                  }}
                />
                <a
                  href={`https://store.steampowered.com/app/${game.id}`}
                  rel='noopener noreferrer'
                  sx={{
                    color: 'primary',
                    textDecoration: 'none',
                    fontWeight: 'medium',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {game.displayName}
                </a>
              </div>
            </td>
            <td>
              <TimeSpent timeInMs={game.playTimeForever * 60 * 1000} />
            </td>
            <td>
              {game.playTime2Weeks ? (
                <TimeSpent timeInMs={game.playTime2Weeks * 60 * 1000} />
              ) : (
                <span sx={{ color: 'tableText', fontStyle: 'italic' }}>–</span>
              )}
            </td>
          </tr>
        ))}
        {remainingGames > 0 && (
          <tr>
            <td colSpan={3} sx={{ textAlign: 'center', padding: '16px' }}>
              <a
                href='https://steamcommunity.com/id/chrisvogt/games/?tab=all'
                rel='noopener noreferrer'
                sx={{
                  color: 'primary',
                  textDecoration: 'none',
                  fontWeight: 'medium',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                ...and {remainingGames} other game{remainingGames !== 1 ? 's' : ''}
                <ViewExternal />
              </a>
            </td>
          </tr>
        )}
      </tbody>
    </Themed.table>
  )
}

export default OwnedGamesTable
