import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecentPostsWidget from './recent-posts-widget'
import useRecentPosts from '../../../hooks/use-recent-posts'
import PostCard from './post-card'

// Mock the useRecentPosts hook
jest.mock('../../../hooks/use-recent-posts')

// Mock the PostCard component
jest.mock('./post-card', () => ({ title }) => <div data-testid='post-card'>{title}</div>)

// Mock other components
jest.mock('../call-to-action', () => ({ title, to }) => <a href={to}>{title}</a>)

jest.mock('../widget', () => ({ children }) => <div>{children}</div>)
jest.mock('../widget-header', () => ({ aside, icon, children }) => (
  <header>
    <div>{children}</div>
    {aside}
  </header>
))

describe('RecentPostsWidget', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a grid with one post', () => {
    useRecentPosts.mockReturnValue([
      {
        frontmatter: {
          banner: 'banner1.jpg',
          date: '2024-10-01',
          title: 'First Post'
        },
        fields: {
          category: 'Blog',
          id: '1',
          path: '/blog/first-post'
        }
      }
    ])

    render(<RecentPostsWidget />)

    // Verify the post card is rendered
    expect(screen.getByTestId('post-card')).toHaveTextContent('First Post')

    // Verify the call-to-action is rendered with the full link text
    expect(screen.getByText(/Browse all published content/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Browse all published content/i })).toHaveAttribute('href', '/blog')
  })

  it('renders a grid with two posts', () => {
    useRecentPosts.mockReturnValue([
      {
        frontmatter: {
          banner: 'banner1.jpg',
          date: '2024-10-01',
          title: 'First Post'
        },
        fields: {
          category: 'Blog',
          id: '1',
          path: '/blog/first-post'
        }
      },
      {
        frontmatter: {
          banner: 'banner2.jpg',
          date: '2024-10-02',
          title: 'Second Post'
        },
        fields: {
          category: 'News',
          id: '2',
          path: '/news/second-post'
        }
      }
    ])

    render(<RecentPostsWidget />)

    // Verify both post cards are rendered
    const postCards = screen.getAllByTestId('post-card')
    expect(postCards.length).toBe(2)
    expect(postCards[0]).toHaveTextContent('First Post')
    expect(postCards[1]).toHaveTextContent('Second Post')
  })

  it('renders a grid with three or more posts', () => {
    useRecentPosts.mockReturnValue([
      {
        frontmatter: {
          banner: 'banner1.jpg',
          date: '2024-10-01',
          title: 'First Post'
        },
        fields: {
          category: 'Blog',
          id: '1',
          path: '/blog/first-post'
        }
      },
      {
        frontmatter: {
          banner: 'banner2.jpg',
          date: '2024-10-02',
          title: 'Second Post'
        },
        fields: {
          category: 'News',
          id: '2',
          path: '/news/second-post'
        }
      },
      {
        frontmatter: {
          banner: 'banner3.jpg',
          date: '2024-10-03',
          title: 'Third Post'
        },
        fields: {
          category: 'Update',
          id: '3',
          path: '/update/third-post'
        }
      }
    ])

    render(<RecentPostsWidget />)

    // Verify all post cards are rendered
    const postCards = screen.getAllByTestId('post-card')
    expect(postCards.length).toBe(3)
    expect(postCards[0]).toHaveTextContent('First Post')
    expect(postCards[1]).toHaveTextContent('Second Post')
    expect(postCards[2]).toHaveTextContent('Third Post')
  })
})
