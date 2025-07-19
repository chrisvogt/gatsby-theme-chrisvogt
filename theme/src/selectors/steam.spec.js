import {
  getAiSummary,
  getHasFatalError,
  getIsLoading,
  getMetrics,
  getOwnedGames,
  getProfileDisplayName,
  getProfileURL,
  getRecentlyPlayedGames
} from './steam'

describe('steam selectors', () => {
  const mockState = {
    widgets: {
      steam: {
        state: 'SUCCESS',
        data: {
          aiSummary: 'Test AI summary content',
          metrics: [
            { displayName: 'Total Games', id: 'total-games', value: 100 },
            { displayName: 'Hours Played', id: 'hours-played', value: 500 }
          ],
          profile: {
            displayName: 'TestUser',
            profileURL: 'https://steamcommunity.com/id/testuser'
          },
          collections: {
            recentlyPlayedGames: [
              { id: 1, displayName: 'Game 1', playTime2Weeks: 60 },
              { id: 2, displayName: 'Game 2', playTime2Weeks: 120 }
            ],
            ownedGames: [
              { id: 1, displayName: 'Game 1', playtimeForever: 180 },
              { id: 2, displayName: 'Game 2', playtimeForever: 300 },
              { id: 3, displayName: 'Game 3', playtimeForever: 45 }
            ]
          }
        }
      }
    }
  }

  const emptyState = {
    widgets: {
      steam: {
        state: 'INIT',
        data: null
      }
    }
  }

  describe('getAiSummary', () => {
    it('should return aiSummary when available', () => {
      expect(getAiSummary(mockState)).toBe('Test AI summary content')
    })

    it('should return undefined when aiSummary is not available', () => {
      expect(getAiSummary(emptyState)).toBeUndefined()
    })
  })

  describe('getMetrics', () => {
    it('should return metrics array when available', () => {
      const result = getMetrics(mockState)
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ displayName: 'Total Games', id: 'total-games', value: 100 })
    })

    it('should return empty array when metrics not available', () => {
      expect(getMetrics(emptyState)).toEqual([])
    })
  })

  describe('getProfileDisplayName', () => {
    it('should return profile display name when available', () => {
      expect(getProfileDisplayName(mockState)).toBe('TestUser')
    })

    it('should return undefined when profile not available', () => {
      expect(getProfileDisplayName(emptyState)).toBeUndefined()
    })
  })

  describe('getProfileURL', () => {
    it('should return profile URL when available', () => {
      expect(getProfileURL(mockState)).toBe('https://steamcommunity.com/id/testuser')
    })

    it('should return undefined when profile not available', () => {
      expect(getProfileURL(emptyState)).toBeUndefined()
    })
  })

  describe('getRecentlyPlayedGames', () => {
    it('should return recently played games when available', () => {
      const result = getRecentlyPlayedGames(mockState)
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ id: 1, displayName: 'Game 1', playTime2Weeks: 60 })
    })

    it('should return empty array when not available', () => {
      expect(getRecentlyPlayedGames(emptyState)).toEqual([])
    })
  })

  describe('getOwnedGames', () => {
    it('should return owned games when available', () => {
      const result = getOwnedGames(mockState)
      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({ id: 1, displayName: 'Game 1', playtimeForever: 180 })
    })

    it('should return empty array when not available', () => {
      expect(getOwnedGames(emptyState)).toEqual([])
    })
  })

  describe('getHasFatalError', () => {
    it('should return false when state is SUCCESS', () => {
      expect(getHasFatalError(mockState)).toBe(false)
    })

    it('should return true when state is FAILURE', () => {
      const failureState = {
        widgets: {
          steam: {
            state: 'FAILURE',
            data: null
          }
        }
      }
      expect(getHasFatalError(failureState)).toBe(true)
    })
  })

  describe('getIsLoading', () => {
    it('should return false when state is SUCCESS', () => {
      expect(getIsLoading(mockState)).toBe(false)
    })

    it('should return true when state is not SUCCESS', () => {
      expect(getIsLoading(emptyState)).toBe(true)
    })
  })
}) 