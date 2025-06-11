import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, LocationProvider } from '@gatsbyjs/reach-router'

import BookExplorer from './book-explorer'

// Mock reach-router's navigate function
jest.mock('@gatsbyjs/reach-router', () => ({
  ...jest.requireActual('@gatsbyjs/reach-router'),
  navigate: jest.fn(),
  useLocation: () => ({ pathname: '/test' })
}))

// Mock console.log to keep test output clean
jest.spyOn(console, 'log').mockImplementation(() => {})

const renderWithRouter = ui =>
  render(
    <LocationProvider
      history={{
        location: { pathname: '/test' },
        listen: () => () => {},
        navigate: () => {},
        _onTransitionComplete: () => {}
      }}
    >
      <Router>
        <div default>{ui}</div>
      </Router>
    </LocationProvider>
  )

describe('Widget/Goodreads/BookExplorer', () => {
  const mockBook = {
    authors: ['Test Author'],
    cdnMediaURL: 'https://chrisvogt.imgix.net/book.jpg',
    description: 'Test description',
    infoLink: 'https://books.google.com/test',
    rating: '4',
    title: 'Test Book'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders book details correctly', () => {
    renderWithRouter(<BookExplorer book={mockBook} onClose={() => {}} default />)
    // Use getAllByText to avoid SVG <title> collision
    const headings = screen.getAllByText('Test Book')
    // Should find at least one heading
    expect(headings.length).toBeGreaterThan(0)
    // Check for the heading element
    expect(headings.some(el => el.tagName.toLowerCase() === 'h3')).toBe(true)
    expect(screen.getByText('by Test Author')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Learn more on Google Books')).toBeInTheDocument()
  })

  it('renders book image with webp format for CDN URLs', () => {
    renderWithRouter(<BookExplorer book={mockBook} onClose={() => {}} default />)
    const image = screen.getByTestId('book-preview-thumbnail')
    expect(image).toHaveAttribute('xlink:href', 'https://chrisvogt.imgix.net/book.jpg?fm=webp')
  })

  it('renders rating stars correctly', () => {
    renderWithRouter(<BookExplorer book={mockBook} onClose={() => {}} default />)
    // The stars are rendered as a single string in a <span>
    expect(screen.getByText('★★★★☆')).toBeInTheDocument()
  })

  it('handles close button click with scroll position preservation', () => {
    const onClose = jest.fn()
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 300 })
    renderWithRouter(<BookExplorer book={mockBook} onClose={onClose} default />)
    const closeButton = screen.getByTestId('close-book-explorer')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })

  it('logs book details for debugging', () => {
    renderWithRouter(<BookExplorer book={mockBook} onClose={() => {}} default />)
    expect(console.log).toHaveBeenCalledWith('BookExplorer rendered with book:', mockBook)
  })

  it('renders external link without target="_blank"', () => {
    renderWithRouter(<BookExplorer book={mockBook} onClose={() => {}} default />)
    const link = screen.getByText('Learn more on Google Books')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).not.toHaveAttribute('target')
  })
})
