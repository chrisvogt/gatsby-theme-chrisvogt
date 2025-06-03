import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MetricBadge from './metric-badge'

describe('MetricBadge Component', () => {
  it('renders the children inside the Badge', () => {
    render(<MetricBadge>Test Badge</MetricBadge>)

    // Check that the Badge component renders with the correct text
    const badge = screen.getByText('Test Badge')
    expect(badge).toBeInTheDocument()
  })
})
