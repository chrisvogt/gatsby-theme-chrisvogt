import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'

import HomeHeaderContent from './home-header-content'

describe('HomeHeaderContent', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<HomeHeaderContent />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles mouse enter event on emoji', () => {
    const { container } = render(<HomeHeaderContent />)
    
    const emoji = container.querySelector('.emoji')
    expect(emoji).toBeInTheDocument()
    
    // Test mouse enter
    fireEvent.mouseEnter(emoji)
    
    // Verify animation is applied
    expect(emoji.style.animation).toBe('wobble 1s ease-in-out')
  })

  it('handles animation end event on emoji', () => {
    const { container } = render(<HomeHeaderContent />)
    
    const emoji = container.querySelector('.emoji')
    expect(emoji).toBeInTheDocument()
    
    // Set initial animation
    emoji.style.animation = 'wobble 1s ease-in-out'
    
    // Test animation end
    fireEvent.animationEnd(emoji)
    
    // Verify animation is cleared
    expect(emoji.style.animation).toBe('none')
  })

  it('handles mouse enter when emoji ref is null', () => {
    const { container } = render(<HomeHeaderContent />)
    
    const h1 = container.querySelector('h1')
    expect(h1).toBeInTheDocument()
    
    // Test mouse enter on h1 (which has the onMouseEnter handler)
    fireEvent.mouseEnter(h1)
    
    // Should not throw error even if emoji ref is null
    expect(h1).toBeInTheDocument()
  })

  it('handles animation end when emoji ref is null', () => {
    const { container } = render(<HomeHeaderContent />)
    
    const h1 = container.querySelector('h1')
    expect(h1).toBeInTheDocument()
    
    // Test animation end on h1 (which has the onAnimationEnd handler)
    fireEvent.animationEnd(h1)
    
    // Should not throw error even if emoji ref is null
    expect(h1).toBeInTheDocument()
  })
})
