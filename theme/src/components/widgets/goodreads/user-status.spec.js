import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { ThemeUIProvider } from 'theme-ui'
import '@testing-library/jest-dom'
import UserStatus from './user-status'

const mockTheme = {
  colors: {
    panel: {
      text: '#333'
    }
  }
}

const renderWithTheme = component => <ThemeUIProvider theme={mockTheme}>{component}</ThemeUIProvider>

describe('UserStatus', () => {
  const mockReviewStatus = {
    type: 'review',
    book: { title: 'The Great Gatsby' },
    rating: 4,
    created: '2023-01-01T12:00:00Z',
    link: 'https://goodreads.com/review/123'
  }

  const mockUserStatus = {
    type: 'userstatus',
    actionText: 'Currently reading <a href="/book/456">1984</a>',
    updated: '2023-01-02T10:00:00Z',
    link: 'https://goodreads.com/status/456'
  }

  const mockUnknownStatus = {
    type: 'unknown',
    created: '2023-01-03T08:00:00Z',
    link: 'https://goodreads.com/status/789'
  }

  it('renders review status correctly', () => {
    const { container } = render(
      renderWithTheme(<UserStatus isLoading={false} status={mockReviewStatus} actorName='John Doe' />)
    )

    expect(container).toHaveTextContent('John Doe rated The Great Gatsby 4 out of 5 stars: ★★★★☆.')
    expect(container).toHaveTextContent('Posted')
  })

  it('renders user status correctly and removes HTML tags', () => {
    const { container } = render(
      renderWithTheme(<UserStatus isLoading={false} status={mockUserStatus} actorName='Jane Smith' />)
    )

    expect(container).toHaveTextContent('Jane Smith Currently reading 1984')
    expect(container).not.toHaveTextContent('<a href')
  })

  it('renders unknown status type with fallback text', () => {
    const { container } = render(
      renderWithTheme(<UserStatus isLoading={false} status={mockUnknownStatus} actorName='Bob Wilson' />)
    )

    expect(container).toHaveTextContent('Bob Wilson Loading...')
  })

  it('renders loading state with placeholders', () => {
    const { container } = render(renderWithTheme(<UserStatus isLoading={true} status={{}} actorName='Loading User' />))

    expect(container).toHaveTextContent('Last Update')
  })

  it('generates correct star rating display', () => {
    const fiveStarStatus = { ...mockReviewStatus, rating: 5 }

    const { container } = render(
      renderWithTheme(<UserStatus isLoading={false} status={fiveStarStatus} actorName='Star Lover' />)
    )

    expect(container).toHaveTextContent('★★★★★')
  })

  it('generates correct star rating for one star', () => {
    const oneStarStatus = { ...mockReviewStatus, rating: 1 }

    const { container } = render(
      renderWithTheme(<UserStatus isLoading={false} status={oneStarStatus} actorName='Critic' />)
    )

    expect(container).toHaveTextContent('★☆☆☆☆')
  })

  it('uses created date when updated is not available', () => {
    const statusWithCreated = { ...mockReviewStatus, updated: undefined }

    const { container } = render(
      renderWithTheme(<UserStatus isLoading={false} status={statusWithCreated} actorName='Time Tester' />)
    )

    expect(container).toHaveTextContent('Posted')
  })

  it('matches snapshot', () => {
    const tree = renderer
      .create(renderWithTheme(<UserStatus isLoading={false} status={mockReviewStatus} actorName='Snapshot User' />))
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
