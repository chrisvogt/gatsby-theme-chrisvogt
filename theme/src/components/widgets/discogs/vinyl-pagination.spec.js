import React from 'react'
import renderer from 'react-test-renderer'

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
})
