import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Category from './category'

describe('Category Component', () => {
  describe('Category Mappings', () => {
    it('renders "Travel Photography" when type is "photography/travel"', () => {
      render(<Category type='photography/travel' />)
      expect(screen.getByText('Travel Photography')).toBeInTheDocument()
    })

    it('renders "Event Photography" when type is "photography/events"', () => {
      render(<Category type='photography/events' />)
      expect(screen.getByText('Event Photography')).toBeInTheDocument()
    })

    it('renders "Piano Covers" when type is "music/piano-covers"', () => {
      render(<Category type='music/piano-covers' />)
      expect(screen.getByText('Piano Covers')).toBeInTheDocument()
    })

    it('renders "Cycling Videos" when type is "videos/bike-rides"', () => {
      render(<Category type='videos/bike-rides' />)
      expect(screen.getByText('Cycling Videos')).toBeInTheDocument()
    })
  })

  describe('Title Case Transformation', () => {
    it('converts hyphenated words to title case', () => {
      render(<Category type='blog-post' />)
      expect(screen.getByText('Blog Post')).toBeInTheDocument()
    })

    it('converts slash-separated words to title case', () => {
      render(<Category type='blog/tech' />)
      expect(screen.getByText('Blog Tech')).toBeInTheDocument()
    })

    it('handles mixed case input', () => {
      render(<Category type='BLOG/TECH' />)
      expect(screen.getByText('Blog Tech')).toBeInTheDocument()
    })

    it('handles single word categories', () => {
      render(<Category type='blog' />)
      expect(screen.getByText('Blog')).toBeInTheDocument()
    })

    it('handles multiple separators', () => {
      render(<Category type='blog/tech-post' />)
      expect(screen.getByText('Blog Tech Post')).toBeInTheDocument()
    })
  })

  describe('Component Styling', () => {
    it('applies the passed sx styles to the Themed.div', () => {
      const sx = { color: 'red' }
      render(<Category type='photography/travel' sx={sx} />)
      const element = screen.getByText('Travel Photography')
      expect(element).toHaveStyle('color: red')
    })
  })
})
