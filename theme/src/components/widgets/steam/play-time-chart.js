/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { useState } from 'react'
import { Themed } from '@theme-ui/mdx'
import getTimeSpent from './get-time-spent'
import isDarkMode from '../../../helpers/isDarkMode'

const PlayTimeChart = ({ games = [], isLoading = false }) => {
  const [hoveredGame, setHoveredGame] = useState(null)
  const { colorMode } = useThemeUI()
  const darkModeActive = isDarkMode(colorMode)

  // Prepare data - top 10 games by playtime
  const topGames = games
    .filter(game => game.playTimeForever > 0)
    .sort((a, b) => b.playTimeForever - a.playTimeForever)
    .slice(0, 10)
    .map((game, index) => ({
      ...game,
      hoursPlayed: Math.round(((game.playTimeForever || 0) / 60) * 100) / 100,
      rank: index + 1
    }))

  const maxHours = Math.max(...topGames.map(g => g.hoursPlayed))

  // Theme-aware styles
  const containerBackground = darkModeActive
    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
    : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)'

  const containerBorder = darkModeActive ? '1px solid rgba(74, 158, 255, 0.2)' : '1px solid rgba(66, 46, 163, 0.2)'

  const headerBorder = darkModeActive ? '2px solid rgba(74, 158, 255, 0.3)' : '2px solid rgba(66, 46, 163, 0.3)'

  const primaryColor = darkModeActive ? '#4a9eff' : '#422EA3'
  const mutedTextColor = darkModeActive ? '#888' : '#666'
  const lightMutedTextColor = darkModeActive ? '#aaa' : '#777'

  // Loading state
  if (isLoading) {
    return (
      <div sx={{ mb: 4 }}>
        <div
          sx={{
            background: containerBackground,
            borderRadius: '16px',
            padding: 4,
            border: containerBorder,
            boxShadow: darkModeActive 
              ? '0 8px 32px rgba(0,0,0,0.3)' 
              : '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              py: 5
            }}
          >
            <div
              sx={{
                width: '60px',
                height: '60px',
                border: `3px solid ${primaryColor}`,
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                },
                animation: 'spin 1s linear infinite'
              }}
            />
            <Themed.p
              sx={{
                color: primaryColor,
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Loading Gaming Library...
            </Themed.p>
          </div>
        </div>
      </div>
    )
  }

  // Empty state when not loading
  if (!games || games.length === 0) {
    return (
      <div sx={{ mb: 4 }}>
        <div
          sx={{
            background: containerBackground,
            borderRadius: '16px',
            padding: 4,
            border: containerBorder,
            boxShadow: darkModeActive 
              ? '0 8px 32px rgba(0,0,0,0.3)' 
              : '0 8px 32px rgba(0,0,0,0.1)',
            textAlign: 'center',
            py: 5
          }}
        >
          <Themed.p
            sx={{
              fontStyle: 'italic',
              color: 'textMuted',
              fontSize: '16px'
            }}
          >
            No gaming data available for library.
          </Themed.p>
        </div>
      </div>
    )
  }

  return (
    <div sx={{ mb: 4 }}>
      <div
        sx={{
          background: containerBackground,
          borderRadius: '16px',
          padding: 4,
          border: containerBorder,
          boxShadow: darkModeActive 
            ? '0 8px 32px rgba(0,0,0,0.3)' 
            : '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        {/* Header */}
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4,
            pb: 3,
            borderBottom: headerBorder
          }}
        >
          <div
            sx={{
              background: darkModeActive
                ? 'linear-gradient(45deg, #4a9eff, #711e9b)'
                : 'linear-gradient(45deg, #422EA3, #711E9B)',
              width: '6px',
              height: '32px',
              borderRadius: '3px',
              mr: 3
            }}
          />
          <div>
            <Themed.h3
              sx={{
                color: primaryColor,
                fontSize: '20px',
                fontWeight: 'bold',
                mb: 1
              }}
            >
              Gaming Library
            </Themed.h3>
            <Themed.p
              sx={{
                color: mutedTextColor,
                fontSize: '14px',
                mb: 0
              }}
            >
              Top {topGames.length} Most Played Games
            </Themed.p>
          </div>
        </div>

        {/* Game Cards */}
        <div sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {topGames.map((game, index) => {
            const progressPercent = (game.hoursPlayed / maxHours) * 100
            const isHovered = hoveredGame?.id === game.id

            return (
              <div
                key={game.id}
                onMouseEnter={() => setHoveredGame(game)}
                onMouseLeave={() => setHoveredGame(null)}
                onClick={() => window.open(`https://store.steampowered.com/app/${game.id}`, '_blank')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: isHovered
                    ? darkModeActive
                      ? 'linear-gradient(90deg, rgba(74, 158, 255, 0.15) 0%, rgba(113, 30, 155, 0.15) 100%)'
                      : 'linear-gradient(90deg, rgba(66, 46, 163, 0.15) 0%, rgba(113, 30, 155, 0.15) 100%)'
                    : darkModeActive
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  padding: 3,
                  border: isHovered 
                    ? darkModeActive
                      ? '2px solid rgba(74, 158, 255, 0.5)'
                      : '2px solid rgba(66, 46, 163, 0.5)'
                    : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  '@keyframes slideIn': {
                    from: { opacity: 0, transform: 'translateX(-20px)' },
                    to: { opacity: 1, transform: 'translateX(0)' }
                  },
                  animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Rank Badge */}
                <div
                  sx={{
                    background:
                      index < 3
                        ? `linear-gradient(45deg, ${
                            index === 0 ? '#ffd700, #ffed4e' : index === 1 ? '#c0c0c0, #e5e5e5' : '#cd7f32, #ffa500'
                          })`
                        : darkModeActive
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)',
                    color: index < 3 ? '#000' : darkModeActive ? '#fff' : '#333',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    mr: 3,
                    minWidth: '32px'
                  }}
                >
                  {game.rank}
                </div>

                {/* Game Banner */}
                <div
                  sx={{
                    position: 'relative',
                    width: '120px',
                    height: '56px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    mr: 3,
                    minWidth: '120px',
                    border: darkModeActive
                      ? '2px solid rgba(74, 158, 255, 0.2)'
                      : '2px solid rgba(66, 46, 163, 0.2)'
                  }}
                >
                  <img
                    src={game.images?.header || game.images?.icon || ''}
                    alt={`${game.displayName} header`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  {isHovered && (
                    <div
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: darkModeActive
                          ? 'rgba(74, 158, 255, 0.2)'
                          : 'rgba(66, 46, 163, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <div
                        sx={{
                          background: darkModeActive
                            ? 'rgba(0, 0, 0, 0.8)'
                            : 'rgba(255, 255, 255, 0.9)',
                          color: primaryColor,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}
                      >
                        CLICK TO VIEW
                      </div>
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div sx={{ flex: 1, minWidth: 0 }}>
                  {/* Game Name */}
                  <div
                    sx={{
                      color: 'text',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {game.displayName}
                  </div>

                  {/* Progress Bar Container */}
                  <div
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3
                    }}
                  >
                    {/* Progress Bar */}
                    <div
                      sx={{
                        flex: 1,
                        background: darkModeActive
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        height: '12px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <div
                        sx={{
                          background: darkModeActive
                            ? 'linear-gradient(90deg, #4a9eff, #711e9b)'
                            : 'linear-gradient(90deg, #422EA3, #711E9B)',
                          height: '100%',
                          borderRadius: '8px',
                          width: `${progressPercent}%`,
                          transition: 'width 1s ease-out',
                          '@keyframes fillBar': {
                            from: { width: '0%' },
                            to: { width: `${progressPercent}%` }
                          },
                          animation: `fillBar 1.5s ease-out ${index * 0.2 + 0.5}s both`
                        }}
                      />
                    </div>

                    {/* Hours Text */}
                    <div
                      sx={{
                        color: primaryColor,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        minWidth: '80px',
                        textAlign: 'right'
                      }}
                    >
                      {game.hoursPlayed}h
                    </div>
                  </div>

                  {/* Detailed Time */}
                  <div
                    sx={{
                      color: lightMutedTextColor,
                      fontSize: '12px',
                      mt: 1
                    }}
                  >
                    {getTimeSpent(game.playTimeForever * 60 * 1000)}
                    {game.playTime2Weeks && (
                      <span sx={{ ml: 2, color: mutedTextColor }}>
                        • {getTimeSpent(game.playTime2Weeks * 60 * 1000)} recently
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Stats */}
        <div
          sx={{
            mt: 4,
            pt: 3,
            borderTop: darkModeActive
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 3
          }}
        >
          <div sx={{ color: mutedTextColor, fontSize: '12px' }}>
            Total Hours:{' '}
            <span sx={{ color: primaryColor, fontWeight: 'bold' }}>
              {topGames.reduce((sum, game) => sum + game.hoursPlayed, 0).toFixed(1)}h
            </span>
          </div>
          <div sx={{ color: mutedTextColor, fontSize: '12px' }}>
            Average:{' '}
            <span sx={{ color: primaryColor, fontWeight: 'bold' }}>
              {(topGames.reduce((sum, game) => sum + game.hoursPlayed, 0) / topGames.length).toFixed(1)}h per game
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayTimeChart
