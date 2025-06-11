import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, LocationProvider } from '@gatsbyjs/reach-router'

import RecentlyReadBooks, { HEADLINE, BODY_TEXT } from './recently-read-books'
import goodreadsMock from '../../../../__mocks__/goodreads-widget.mock.json'

const mockBooks = goodreadsMock.payload.collections.recentlyReadBooks

const renderWithRouter = ui =>
  render(
    <LocationProvider
      history={{
        location: { pathname: '/' },
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

describe('Widget/Goodreads/RecentlyReadBooks', () => {
  describe('loading state', () => {
    it('renders a placeholder for each book expected to render', () => {
      const { container } = renderWithRouter(<RecentlyReadBooks books={[]} isLoading={true} default />)
      expect(container.querySelectorAll('.rect-shape')).toHaveLength(12)
    })
  })

  describe('success sate', () => {
    it('renders a headline and paragraph text for the widget', () => {
      renderWithRouter(<RecentlyReadBooks books={mockBooks} isLoading={false} default />)
      expect(screen.getByText(HEADLINE)).toBeInTheDocument()
      expect(screen.getByText(HEADLINE)).toHaveTextContent(HEADLINE)
      expect(screen.getByText(BODY_TEXT)).toBeInTheDocument()
      expect(screen.getByText(BODY_TEXT)).toHaveTextContent(BODY_TEXT)
    })

    it('renders thumbnails using the image cdn urls', () => {
      renderWithRouter(<RecentlyReadBooks books={mockBooks} isLoading={false} default />)
      const images = screen.getAllByTestId('book-preview-thumbnail')
      expect(images).toHaveLength(mockBooks.length)
      images.forEach((image, idx) => {
        expect(image).toHaveAttribute('xlink:href', `${mockBooks[idx].cdnMediaURL}?fm=webp`)
      })
    })
  })

  describe('navigation and scroll behavior', () => {
    const mockNavigate = jest.fn()
    const mockScrollTo = jest.fn()

    beforeEach(() => {
      window.scrollTo = mockScrollTo
      mockNavigate.mockClear()
      mockScrollTo.mockClear()
      // Mock navigate function
      jest.spyOn(require('@gatsbyjs/reach-router'), 'navigate').mockImplementation(mockNavigate)
    })

    it('restores scroll position when location state contains scrollPosition', () => {
      const scrollPosition = 500
      // Render with location state to trigger useEffect
      render(
        <LocationProvider
          history={{
            location: { pathname: '/', state: { scrollPosition } },
            listen: () => () => {},
            navigate: () => {},
            _onTransitionComplete: () => {}
          }}
        >
          <Router>
            <div default>
              <RecentlyReadBooks books={mockBooks} isLoading={false} default />
            </div>
          </Router>
        </LocationProvider>
      )
      expect(mockScrollTo).toHaveBeenCalledWith(0, scrollPosition)
    })

    it('handles close button click with scroll position preservation', () => {
      // Ensure mockBooks contains a book with id '123'
      const testBook = { ...mockBooks[0], id: '123' }
      const books = [testBook, ...mockBooks.slice(1)]
      render(
        <LocationProvider
          history={{
            location: { pathname: '/test', search: '?bookId=123' },
            listen: () => () => {},
            navigate: () => {},
            _onTransitionComplete: () => {}
          }}
        >
          <Router>
            <div default>
              <RecentlyReadBooks books={books} isLoading={false} default />
            </div>
          </Router>
        </LocationProvider>
      )
      // Mock window.scrollY
      Object.defineProperty(window, 'scrollY', { value: 300 })
      const closeButton = screen.getByTestId('close-book-explorer')
      fireEvent.click(closeButton)
      expect(mockNavigate).toHaveBeenCalledWith('/test', {
        replace: true,
        state: { scrollPosition: 300 }
      })
    })
  })

  describe('book rendering', () => {
    it('handles both cdnMediaURL and thumbnail fallback', () => {
      const booksWithMixedUrls = [
        { id: 'cdn', title: 'CDN Book', cdnMediaURL: 'https://chrisvogt.imgix.net/book1.jpg' },
        { id: 'plain', title: 'Plain Book', thumbnail: 'https://example.com/book2.jpg' } // no cdnMediaURL
      ]
      renderWithRouter(<RecentlyReadBooks books={booksWithMixedUrls} isLoading={false} default />)
      const images = screen.getAllByTestId('book-preview-thumbnail')
      expect(images[0]).toHaveAttribute('xlink:href', 'https://chrisvogt.imgix.net/book1.jpg?fm=webp')
      expect(images[1]).toHaveAttribute('xlink:href', 'https://example.com/book2.jpg')
    })
  })
})
