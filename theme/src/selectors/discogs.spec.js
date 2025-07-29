import { getMetrics, getReleases, getProfileURL } from './discogs'

const mockState = {
  widgets: {
    discogs: {
      data: {
        collections: {
          releases: [
            {
              id: 28461454,
              basicInformation: {
                title: 'Test Album',
                year: 2023,
                artists: [{ name: 'Test Artist' }]
              }
            }
          ]
        },
        metrics: {
          'Vinyls Owned': 37,
          'Total Value': 1250,
          'Wishlist Items': 15
        },
        profile: {
          profileURL: 'https://www.discogs.com/user/testuser/collection'
        }
      }
    }
  }
}

const emptyState = {
  widgets: {
    discogs: {
      data: null
    }
  }
}

describe('Discogs Selectors', () => {
  describe('getMetrics', () => {
    it('transforms object metrics to array format', () => {
      const result = getMetrics(mockState)

      expect(result).toEqual([
        { displayName: 'Vinyls Owned', id: 'vinyls-owned', value: 37 },
        { displayName: 'Total Value', id: 'total-value', value: 1250 },
        { displayName: 'Wishlist Items', id: 'wishlist-items', value: 15 }
      ])
    })

    it('returns empty array when no metrics', () => {
      const result = getMetrics(emptyState)
      expect(result).toEqual([])
    })

    it('filters out undefined and null values', () => {
      const stateWithNulls = {
        widgets: {
          discogs: {
            data: {
              metrics: {
                Valid: 10,
                'Null Value': null,
                'Undefined Value': undefined,
                'Zero Value': 0
              }
            }
          }
        }
      }

      const result = getMetrics(stateWithNulls)
      expect(result).toEqual([
        { displayName: 'Valid', id: 'valid', value: 10 },
        { displayName: 'Zero Value', id: 'zero-value', value: 0 }
      ])
    })
  })

  describe('getReleases', () => {
    it('returns releases array', () => {
      const result = getReleases(mockState)
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(28461454)
    })

    it('returns empty array when no releases', () => {
      const result = getReleases(emptyState)
      expect(result).toEqual([])
    })
  })

  describe('getProfileURL', () => {
    it('returns profile URL', () => {
      const result = getProfileURL(mockState)
      expect(result).toBe('https://www.discogs.com/user/testuser/collection')
    })

    it('returns default URL when no profile', () => {
      const result = getProfileURL(emptyState)
      expect(result).toBe('https://www.discogs.com')
    })
  })
})
