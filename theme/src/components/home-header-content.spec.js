import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeHeaderContent from './home-header-content'

describe('HomeHeaderContent', () => {
  it('renders the header content correctly', () => {
    render(<HomeHeaderContent />)

    // Check for the main headline
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Welcome! 👋 I'm Your Name.")

    // Check for the first paragraph with Lorem Ipsum content
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument()
    expect(screen.getByText(/consectetur adipiscing elit/i)).toBeInTheDocument()

    // Check for the second paragraph with Lorem Ipsum content
    expect(screen.getByText(/Duis aute irure dolor in reprehenderit/i)).toBeInTheDocument()
    expect(screen.getByText(/Excepteur sint occaecat cupidatat non proident/i)).toBeInTheDocument()
  })

  it('applies wobble animation to emoji on mouse enter', () => {
    render(<HomeHeaderContent />)

    const emoji = screen.getByText('👋')

    // Simulate mouse enter
    fireEvent.mouseEnter(emoji)

    // Check if the animation is applied
    expect(emoji).toHaveStyle('animation: wobble 1s ease-in-out')
  })

  it('removes wobble animation from emoji on animation end', () => {
    render(<HomeHeaderContent />)

    const emoji = screen.getByText('👋')

    // Simulate mouse enter and animation end
    fireEvent.mouseEnter(emoji)
    fireEvent.animationEnd(emoji)

    // Check if the animation is removed
    expect(emoji).toHaveStyle('animation: none')
  })
})
