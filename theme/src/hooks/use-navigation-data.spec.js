import { renderHook } from '@testing-library/react-hooks'
import { useStaticQuery } from 'gatsby'
import useNavigationData from './use-navigation-data'

const data = {
  allDataJson: {
    edges: [
      {
        node: {
          payload: {
            left: {
              path: '/',
              slug: 'home',
              text: 'Home',
              title: 'Home'
            }
          }
        }
      }
    ]
  }
}

jest.mock('gatsby')

describe('useNavigationData', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => data)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns data used to render the top bar navigation links', () => {
    const { result } = renderHook(() => useNavigationData())
    expect(result.current).toEqual(data.allDataJson.edges[0].node.payload)
  })

  it('handles missing allDataJson', () => {
    useStaticQuery.mockImplementation(() => ({}))
    const { result } = renderHook(() => useNavigationData())
    expect(result.current).toEqual({})
  })

  it('handles missing edges', () => {
    useStaticQuery.mockImplementation(() => ({ allDataJson: {} }))
    const { result } = renderHook(() => useNavigationData())
    expect(result.current).toEqual({})
  })

  it('handles empty edges array', () => {
    useStaticQuery.mockImplementation(() => ({ allDataJson: { edges: [] } }))
    const { result } = renderHook(() => useNavigationData())
    expect(result.current).toEqual({})
  })

  it('handles missing node', () => {
    useStaticQuery.mockImplementation(() => ({ allDataJson: { edges: [{}] } }))
    const { result } = renderHook(() => useNavigationData())
    expect(result.current).toEqual({})
  })

  it('handles missing payload', () => {
    useStaticQuery.mockImplementation(() => ({ allDataJson: { edges: [{ node: {} }] } }))
    const { result } = renderHook(() => useNavigationData())
    expect(result.current).toEqual({})
  })
})
