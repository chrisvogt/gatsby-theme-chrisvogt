import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RecentlyReadBooks, { HEADLINE, BODY_TEXT } from './recently-read-books'
import goodreadsMock from '../../../../__mocks__/goodreads-widget.mock.json'

const mockBooks = goodreadsMock.payload.collections.recentlyReadBooks

describe('Widget/Goodreads/RecentlyReadBooks', () => {
  describe('loading state', () => {
    it('renders a placeholder for each book expected to render', () => {
      const { container } = render(<RecentlyReadBooks books={[]} isLoading={true} />)
      expect(container.querySelectorAll('.rect-shape')).toHaveLength(12)
    })
  })

  describe('success sate', () => {
    it('renders a headline and paragraph text for the widget', () => {
      render(<RecentlyReadBooks books={mockBooks} isLoading={false} />)
      expect(screen.getByText(HEADLINE)).toBeInTheDocument()
      expect(screen.getByText(HEADLINE)).toHaveTextContent(HEADLINE)
      expect(screen.getByText(BODY_TEXT)).toBeInTheDocument()
      expect(screen.getByText(BODY_TEXT)).toHaveTextContent(BODY_TEXT)
    })

    it('renders thumbnails using the image cdn urls', () => {
      render(<RecentlyReadBooks books={mockBooks} isLoading={false} />)
      const images = screen.getAllByTestId('book-preview-thumbnail')
      expect(images).toHaveLength(mockBooks.length)
      images.forEach((image, idx) => {
        expect(image).toHaveAttribute('xlink:href', `${mockBooks[idx].cdnMediaURL}?fm=webp`)
      })
    })
  })
})
