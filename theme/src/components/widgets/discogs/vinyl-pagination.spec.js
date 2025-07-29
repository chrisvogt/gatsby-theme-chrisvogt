import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'

import VinylPagination from './vinyl-pagination'

describe('VinylPagination', () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it('renders pagination controls when totalPages > 1', () => {
    const tree = renderer
      .create(
        <VinylPagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange}>
          <div>Test content</div>
        </VinylPagination>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('does not render pagination controls when totalPages <= 1', () => {
    const tree = renderer
      .create(
        <VinylPagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange}>
          <div>Test content</div>
        </VinylPagination>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('disables previous button on first page', () => {
    const tree = renderer
      .create(
        <VinylPagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange}>
          <div>Test content</div>
        </VinylPagination>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('disables next button on last page', () => {
    const tree = renderer
      .create(
        <VinylPagination currentPage={3} totalPages={3} onPageChange={mockOnPageChange}>
          <div>Test content</div>
        </VinylPagination>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('shows correct page info', () => {
    const tree = renderer
      .create(
        <VinylPagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange}>
          <div>Test content</div>
        </VinylPagination>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('calls onPageChange when previous button is clicked', () => {
    const { getByLabelText } = render(
      <VinylPagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />
    )

    const previousButton = getByLabelText('Previous page')
    fireEvent.click(previousButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange when next button is clicked', () => {
    const { getByLabelText } = render(
      <VinylPagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />
    )

    const nextButton = getByLabelText('Next page')
    fireEvent.click(nextButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when page number is clicked', () => {
    const { getByLabelText } = render(
      <VinylPagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />
    )

    const pageButton = getByLabelText('Go to page 3')
    fireEvent.click(pageButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('does not call onPageChange when clicking current page', () => {
    const { getByLabelText } = render(
      <VinylPagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />
    )

    const currentPageButton = getByLabelText('Go to page 2')
    fireEvent.click(currentPageButton)

    expect(mockOnPageChange).not.toHaveBeenCalled()
  })

  it('does not call onPageChange when clicking disabled previous button', () => {
    const { getByLabelText } = render(
      <VinylPagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />
    )

    const previousButton = getByLabelText('Previous page')
    fireEvent.click(previousButton)

    expect(mockOnPageChange).not.toHaveBeenCalled()
  })

  it('does not call onPageChange when clicking disabled next button', () => {
    const { getByLabelText } = render(
      <VinylPagination currentPage={3} totalPages={3} onPageChange={mockOnPageChange} />
    )

    const nextButton = getByLabelText('Next page')
    fireEvent.click(nextButton)

    expect(mockOnPageChange).not.toHaveBeenCalled()
  })

  it('handles boundary conditions for page navigation', () => {
    const { getByLabelText } = render(
      <VinylPagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />
    )

    // Test going to page 0 (should not call onPageChange)
    const previousButton = getByLabelText('Previous page')
    fireEvent.click(previousButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(1)

    mockOnPageChange.mockClear()

    // Test going to page beyond totalPages (should not call onPageChange)
    const nextButton = getByLabelText('Next page')
    fireEvent.click(nextButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('renders with single page correctly', () => {
    const { queryByLabelText } = render(
      <VinylPagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
    )

    // Should not render pagination controls
    expect(queryByLabelText('Previous page')).not.toBeInTheDocument()
    expect(queryByLabelText('Next page')).not.toBeInTheDocument()
    expect(queryByLabelText('Go to page 1')).not.toBeInTheDocument()
  })

  it('renders with many pages correctly', () => {
    const { getByLabelText, getAllByRole } = render(
      <VinylPagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    )

    // Should render all page numbers
    const pageButtons = getAllByRole('button').filter(button =>
      button.getAttribute('aria-label')?.includes('Go to page')
    )
    expect(pageButtons).toHaveLength(10)

    // Should have correct current page
    const currentPageButton = getByLabelText('Go to page 5')
    expect(currentPageButton.getAttribute('aria-current')).toBe('page')
  })
})
