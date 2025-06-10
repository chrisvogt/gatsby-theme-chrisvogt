import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeHeaderContent from './home-header-content'

describe('HomeHeaderContent', () => {
  it('renders the header content correctly', () => {
    render(<HomeHeaderContent />)

    // Check for the main headline
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hi! 👋 I'm Chris Vogt.")

    // Check for the paragraphs
    expect(screen.getByText(/This is my personal blog and digital garden/i)).toBeInTheDocument()
    expect(screen.getByText(/I work as a software engineer at GoDaddy/i)).toBeInTheDocument()

    // Use a more flexible text matcher for the piano paragraph
    const pianoParagraph = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === 'p' && content.includes('Most evenings') && content.includes('piano')
    )
    expect(pianoParagraph).toBeInTheDocument()

    expect(screen.getByText(/This space is always evolving/i)).toBeInTheDocument()
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
