import { getBooks, getMetrics, getUserStatus, getProfileDisplayName, getHasFatalError, getIsLoading } from './goodreads'

describe('goodreads selectors', () => {
  const baseState = {
    widgets: {
      goodreads: {
        state: 'SUCCESS',
        data: {
          collections: {
            recentlyReadBooks: [
              { id: 1, title: 'Book One', thumbnail: 'thumb1.jpg' },
              { id: 2, title: 'Book Two' }, // no thumbnail, should be filtered out
              { id: 3, title: 'Book Three', thumbnail: 'thumb3.jpg' }
            ],
            updates: [
              { type: 'note', content: 'Not a userstatus' },
              { type: 'userstatus', content: 'Reading something' }
            ]
          },
          profile: {
            name: 'Chris',
            friendsCount: 42,
            readCount: 123
          }
        }
      }
    }
  }

  it('returns filtered books with thumbnails, max 12', () => {
    const books = getBooks(baseState)
    expect(books).toEqual([
      { id: 1, title: 'Book One', thumbnail: 'thumb1.jpg' },
      { id: 3, title: 'Book Three', thumbnail: 'thumb3.jpg' }
    ])
  })

  it('returns correct metrics', () => {
    const metrics = getMetrics(baseState)
    expect(metrics).toEqual([
      { displayName: 'Friends', id: 'friends-count', value: 42 },
      { displayName: 'Books Read', id: 'read-count', value: 123 }
    ])
  })

  it('returns empty metrics when no data', () => {
    const state = {
      widgets: { goodreads: { state: 'SUCCESS', data: { profile: {} } } }
    }
    expect(getMetrics(state)).toEqual([])
  })

  it('returns user status from updates', () => {
    const status = getUserStatus(baseState)
    expect(status).toEqual({ type: 'userstatus', content: 'Reading something' })
  })

  it('returns empty object if no userstatus/review update found', () => {
    const state = {
      widgets: {
        goodreads: {
          state: 'SUCCESS',
          data: {
            collections: {
              updates: [{ type: 'note' }]
            }
          }
        }
      }
    }
    expect(getUserStatus(state)).toEqual({})
  })

  it('returns profile display name', () => {
    expect(getProfileDisplayName(baseState)).toBe('Chris')
  })

  it('returns hasFatalError true when state is FAILURE', () => {
    const state = {
      widgets: {
        goodreads: {
          state: 'FAILURE',
          data: {}
        }
      }
    }
    expect(getHasFatalError(state)).toBe(true)
  })

  it('returns isLoading true when state is not SUCCESS', () => {
    const state = {
      widgets: {
        goodreads: {
          state: 'PENDING',
          data: {}
        }
      }
    }
    expect(getIsLoading(state)).toBe(true)
  })

  it('returns isLoading false when state is SUCCESS', () => {
    expect(getIsLoading(baseState)).toBe(false)
  })

  it('returns default fallbacks when state is empty', () => {
    const emptyState = { widgets: { goodreads: { state: 'SUCCESS', data: {} } } }
    expect(getBooks(emptyState)).toEqual([])
    expect(getMetrics(emptyState)).toEqual([])
    expect(getUserStatus(emptyState)).toEqual({})
    expect(getProfileDisplayName(emptyState)).toBeUndefined()
  })
})
