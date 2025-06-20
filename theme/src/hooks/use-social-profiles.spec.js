import { renderHook } from '@testing-library/react-hooks'
import { useStaticQuery } from 'gatsby'
import useSocialProfiles from './use-social-profiles'

const data = {
  allSocialProfilesJson: {
    edges: [
      {
        node: {
          href: 'https://twitter.com/c1v0',
          id: '123-456-789',
          slug: 'twitter',
          displayName: 'Twitter',
          icon: {
            class: 'fab fa-twitter',
            name: 'twitter',
            reactIcon: 'faTwitter',
            set: 'fab'
          }
        }
      },
      {
        invalid: 'I should be filtered out'
      }
    ]
  }
}

jest.mock('gatsby')

describe('useSocialProfiles', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => data)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns the expected number of profiles', () => {
    const { result } = renderHook(() => useSocialProfiles())
    expect(result.current).toHaveLength(1)
  })

  it('selects data inside the `node` child', () => {
    const { result } = renderHook(() => useSocialProfiles())
    expect(result.current[0]).toEqual(data.allSocialProfilesJson.edges[0].node)
  })

  it('handles missing allSocialProfilesJson', () => {
    useStaticQuery.mockImplementation(() => ({}))
    const { result } = renderHook(() => useSocialProfiles())
    expect(result.current).toEqual([])
  })

  it('handles missing edges', () => {
    useStaticQuery.mockImplementation(() => ({ allSocialProfilesJson: {} }))
    const { result } = renderHook(() => useSocialProfiles())
    expect(result.current).toEqual([])
  })

  it('handles empty edges array', () => {
    useStaticQuery.mockImplementation(() => ({ allSocialProfilesJson: { edges: [] } }))
    const { result } = renderHook(() => useSocialProfiles())
    expect(result.current).toEqual([])
  })
})
