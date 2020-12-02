import { renderHook } from '@testing-library/react-hooks'
import { useStaticQuery } from 'gatsby'
import useRecentPosts from './use-recent-posts'

const data = {
  allMdx: {
    edges: [
      {
        node: {
          excerpt: 'Lorum ipsum dolor sit amet',
          fields: {
            category: 'tutorials',
            id: '389b3a15-4c0b-5229-875e-94b725470f74',
            slug: '/posts/short-lorum'
          },
          frontmatter: {
            banner: 'https://picsum.photos/500/500?sig=5',
            date: 'November 02, 2020',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.↵',
            slug: '/posts/short-lorum',
            title: 'Lorum (Short)'
          }
        }
      },
      {
        invalid: 'I should be filtered out'
      }
    ]
  }
}

jest.mock('gatsby');

describe('useRecentPosts', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => data)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns the expected number of posts', () => {
    const { result } = renderHook(() => useRecentPosts())
    expect(result.current.length).toBe(1)
  })

  it('selects data inside the `node` child', () => {
    const { result } = renderHook(() => useRecentPosts())
    expect(result.current[0]).toEqual(data.allMdx.edges[0].node)
  })
})
