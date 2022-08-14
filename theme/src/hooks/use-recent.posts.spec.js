import { renderHook } from '@testing-library/react-hooks'
import { useStaticQuery } from 'gatsby'
import useRecentPosts from './use-recent-posts'

const data = {
  allMdx: {
    edges: [{
      node: {
        excerpt: 'One simple thing and you\'ll never believe what happened!',
        fields: {
          id: 'post-identifier',
          category: 'general',
          slug: 'a-blog-article'
        },
        frontmatter: {
          banner: 'https://placekitten.com/300/300',
          title: 'A Blog Article'
        }
      }
    }]
  }
}

jest.mock('gatsby')

describe('useRecentPosts', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => data)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns the latest posts', () => {
    const { result } = renderHook(() => useRecentPosts())
    expect(result.current).toEqual([{
      ...data.allMdx.edges[0].node
    }])
  })
})
