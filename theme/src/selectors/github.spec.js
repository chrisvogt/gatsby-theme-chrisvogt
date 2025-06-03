import { getMetrics } from './github'

describe('getMetrics selector', () => {
  it('returns memoized metrics', () => {
    const state = {
      widgets: {
        github: {
          state: 'SUCCESS',
          data: {
            user: {
              followers: { totalCount: 100 },
              following: { totalCount: 50 }
            }
          }
        }
      }
    }

    const firstResult = getMetrics(state)
    const secondResult = getMetrics(state)

    expect(firstResult).toEqual([
      { displayName: 'Followers', id: 'followers', value: 100 },
      { displayName: 'Following', id: 'following', value: 50 }
    ])
    expect(firstResult).toBe(secondResult) // same reference
  })
})
