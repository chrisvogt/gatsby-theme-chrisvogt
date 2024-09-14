import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Category from './category'

describe('Category Component', () => {
  it('renders "Travel Photography" when type is "photography/travel"', () => {
    render(<Category type="photography/travel" />)
    expect(screen.getByText('Travel Photography')).toBeInTheDocument()
  })

  it('renders "Event Photography" when type is "photography/events"', () => {
    render(<Category type="photography/events" />)
    expect(screen.getByText('Event Photography')).toBeInTheDocument()
  })

  it('renders "Piano Covers" when type is "music/piano-covers"', () => {
    render(<Category type="music/piano-covers" />)
    expect(screen.getByText('Piano Covers')).toBeInTheDocument()
  })

  it('renders the type as is if no replacement exists', () => {
    render(<Category type="other-category" />)
    expect(screen.getByText('other-category')).toBeInTheDocument()
  })

  it('applies the passed sx styles to the Themed.div', () => {
    const sx = { color: 'red' }
    render(<Category type="photography/travel" sx={sx} />)
    const element = screen.getByText('Travel Photography')
    expect(element).toHaveStyle('color: red')
  })
})
