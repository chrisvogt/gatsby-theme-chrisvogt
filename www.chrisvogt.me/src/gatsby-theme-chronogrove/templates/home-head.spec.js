import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeHead from './home-head'

// Mock the Seo component
jest.mock('../../../../theme/src/components/seo', () => ({ title, description, keywords, children }) => (
  <div data-testid='seo' data-title={title} data-description={description} data-keywords={keywords}>
    {children}
  </div>
))

describe('HomeHead (chrisvogt.me shadow)', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<HomeHead />)
    expect(getByTestId('seo')).toBeInTheDocument()
  })

  it('passes correct Chris Vogt-specific metadata to Seo component', () => {
    const { getByTestId } = render(<HomeHead />)
    const seoElement = getByTestId('seo')

    expect(seoElement).toHaveAttribute('data-title', 'Home')
    expect(seoElement).toHaveAttribute(
      'data-description',
      "Explore Chris Vogt's digital garden. A Software Engineer in San Francisco, Chris shares his interest in photography, piano, and travel."
    )
    expect(seoElement).toHaveAttribute(
      'data-keywords',
      'Chris Vogt, Software Engineer in San Francisco, GoDaddy engineer blog, photography blog, piano recordings, travel blog, personal blog, digital garden'
    )
  })

  it('renders Open Graph meta tags for chrisvogt.me', () => {
    const { container } = render(<HomeHead />)

    const urlMeta = container.querySelector('meta[property="og:url"]')
    const typeMeta = container.querySelector('meta[property="og:type"]')

    expect(urlMeta).toHaveAttribute('content', 'https://www.chrisvogt.me')
    expect(typeMeta).toHaveAttribute('content', 'website')
  })

  it('renders structured data with Chris Vogt-specific information', () => {
    const { container } = render(<HomeHead />)
    const script = container.querySelector('script[type="application/ld+json"]')

    expect(script).toBeInTheDocument()
    const structuredData = JSON.parse(script.textContent)

    expect(structuredData['@context']).toBe('https://schema.org')
    expect(structuredData['@type']).toBe('Person')
    expect(structuredData.name).toBe('Chris Vogt')
    expect(structuredData.url).toBe('https://www.chrisvogt.me')
    expect(structuredData.jobTitle).toBe('Principal Software Engineer')
    expect(structuredData.worksFor.name).toBe('GoDaddy')
    expect(structuredData.sameAs).toContain('https://github.com/chrisvogt')
    expect(structuredData.sameAs).toContain('https://linkedin.com/in/cjvogt')
  })

  it('includes social media profiles in structured data', () => {
    const { container } = render(<HomeHead />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const structuredData = JSON.parse(script.textContent)

    const expectedProfiles = [
      'https://linkedin.com/in/cjvogt',
      'https://github.com/chrisvogt',
      'https://x.com/c1v0',
      'https://twitter.com/c1v0',
      'https://www.instagram.com/c1v0',
      'https://stackoverflow.com/users/1391826/chris-vogt'
    ]

    expectedProfiles.forEach(profile => {
      expect(structuredData.sameAs).toContain(profile)
    })
  })
})
