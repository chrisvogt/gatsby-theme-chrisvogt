import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeHeaderContent from './home-header-content'

describe('HomeHeaderContent', () => {
  it('renders the header content correctly', () => {
    render(<HomeHeaderContent />)

    // Custom matcher to find the headline text
    const headlineText = (content, element) => {
      const hasText = node => node.textContent === "Hi! 👋 I'm Chris Vogt."
      const nodeHasText = hasText(element)
      const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child))
      return nodeHasText && childrenDontHaveText
    }

    // Check for the main headline using custom text matcher
    expect(screen.getByText(headlineText)).toBeInTheDocument()

    // Check for the paragraphs
    expect(screen.getByText(/I'm a Software Engineer/i)).toBeInTheDocument()
    expect(screen.getByText(/This website is a digital garden/i)).toBeInTheDocument()
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
