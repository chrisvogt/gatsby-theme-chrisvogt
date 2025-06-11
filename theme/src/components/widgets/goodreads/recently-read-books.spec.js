import React from 'react'
import { render, screen } from '@testing-library/react'
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
      <Router>{ui}</Router>
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
})
