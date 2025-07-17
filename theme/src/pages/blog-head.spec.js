import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogHead from './blog-head'

// Mock the useSiteMetadata hook
jest.mock('../hooks/use-site-metadata', () => ({
  useSiteMetadata: () => ({
    title: 'Test Site',
    description: 'Test site description',
    siteUrl: 'https://test.example.com'
  })
}))

// Mock the Seo component
jest.mock('../components/seo', () => ({ title, description, children }) => (
  <div data-testid='seo' data-title={title} data-description={description}>
    {children}
  </div>
))

describe('BlogHead', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<BlogHead />)
    expect(getByTestId('seo')).toBeInTheDocument()
  })

  it('passes correct title and description to Seo component', () => {
    const { getByTestId } = render(<BlogHead />)
    const seoElement = getByTestId('seo')

    expect(seoElement).toHaveAttribute('data-title', 'Blog - Test Site')
    expect(seoElement).toHaveAttribute('data-description', 'Test site description')
  })

  it('renders Open Graph meta tags', () => {
    const { container } = render(<BlogHead />)

    const urlMeta = container.querySelector('meta[property="og:url"]')
    const typeMeta = container.querySelector('meta[property="og:type"]')

    expect(urlMeta).toHaveAttribute('content', 'https://test.example.com/blog/')
    expect(typeMeta).toHaveAttribute('content', 'website')
  })

  it('uses site metadata correctly', () => {
    // Test that the component calls useSiteMetadata and uses the returned values
    const { getByTestId } = render(<BlogHead />)
    const seoElement = getByTestId('seo')

    // Verify that the title includes the site title
    expect(seoElement.getAttribute('data-title')).toBe('Blog - Test Site')

    // Verify that the description is passed through
    expect(seoElement.getAttribute('data-description')).toBe('Test site description')
  })
})
