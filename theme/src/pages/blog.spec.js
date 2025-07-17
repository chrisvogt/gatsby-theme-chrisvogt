import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogIndexPage from './blog'

// Mock the components
jest.mock('../components/layout', () => ({ children }) => <div data-testid='layout'>{children}</div>)
jest.mock('../components/blog/page-header', () => ({ children }) => <h1>{children}</h1>)
jest.mock('../components/widgets/recent-posts/post-card', () => ({ title, category }) => (
  <div data-testid='post-card' data-category={category}>
    {title}
  </div>
))
jest.mock('../components/seo', () => () => <div data-testid='seo' />)
jest.mock('./blog-head', () => () => <div data-testid='blog-head' />)

// Mock the getPosts function
jest.mock('../hooks/use-recent-posts', () => ({
  getPosts: jest.fn()
}))

import { getPosts } from '../hooks/use-recent-posts'

describe('BlogIndexPage', () => {
  const mockPosts = [
    {
      frontmatter: {
        title: 'Regular Blog Post',
        slug: 'regular-post'
      },
      fields: {
        category: 'blog',
        id: '1',
        path: '/blog/regular-post'
      }
    },
    {
      frontmatter: {
        title: 'Now Page Post',
        slug: 'now'
      },
      fields: {
        category: 'blog',
        id: '2',
        path: '/blog/now'
      }
    },
    {
      frontmatter: {
        title: 'Photography Post',
        slug: 'photography-post'
      },
      fields: {
        category: 'photography',
        id: '3',
        path: '/photography/photography-post'
      }
    },
    {
      frontmatter: {
        title: 'Music Post',
        slug: 'music-post'
      },
      fields: {
        category: 'music',
        id: '4',
        path: '/music/music-post'
      }
    }
  ]

  beforeEach(() => {
    getPosts.mockReturnValue(mockPosts)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the blog page with filtered posts', () => {
    render(<BlogIndexPage data={{}} />)

    // Should render the layout
    expect(screen.getByTestId('layout')).toBeInTheDocument()

    // Should render the page header
    expect(screen.getByText('Blog Posts')).toBeInTheDocument()

    // Should render only the regular blog post (filtered out: now, photography, music)
    const postCards = screen.getAllByTestId('post-card')
    expect(postCards).toHaveLength(1)
    expect(postCards[0]).toHaveTextContent('Regular Blog Post')
  })

  it('filters out posts with slug "now"', () => {
    render(<BlogIndexPage data={{}} />)

    const postCards = screen.getAllByTestId('post-card')
    const nowPost = postCards.find(card => card.textContent === 'Now Page Post')
    expect(nowPost).toBeUndefined()
  })

  it('filters out photography posts', () => {
    render(<BlogIndexPage data={{}} />)

    const postCards = screen.getAllByTestId('post-card')
    const photographyPost = postCards.find(card => card.textContent === 'Photography Post')
    expect(photographyPost).toBeUndefined()
  })

  it('filters out music posts', () => {
    render(<BlogIndexPage data={{}} />)

    const postCards = screen.getAllByTestId('post-card')
    const musicPost = postCards.find(card => card.textContent === 'Music Post')
    expect(musicPost).toBeUndefined()
  })

  it('handles empty posts array', () => {
    getPosts.mockReturnValue([])
    render(<BlogIndexPage data={{}} />)

    const postCards = screen.queryAllByTestId('post-card')
    expect(postCards).toHaveLength(0)
  })

  it('handles null posts', () => {
    getPosts.mockReturnValue(null)
    render(<BlogIndexPage data={{}} />)

    const postCards = screen.queryAllByTestId('post-card')
    expect(postCards).toHaveLength(0)
  })

  it('calls getPosts with the provided data', () => {
    const mockData = { someData: 'value' }
    render(<BlogIndexPage data={mockData} />)

    expect(getPosts).toHaveBeenCalledWith(mockData)
  })
})
