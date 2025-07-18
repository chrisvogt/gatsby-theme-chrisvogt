import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useStaticQuery } from 'gatsby'
import HomeHead from './home-head'

// Mock the Seo component
jest.mock('../components/seo', () => ({ title, description, children }) => (
  <div data-testid='seo' data-title={title} data-description={description}>
    {children}
  </div>
))

// Mock gatsby useStaticQuery
jest.mock('gatsby')

const mockSiteMetadata = {
  description: 'Test description',
  siteUrl: 'https://test.com',
  social: {
    twitterUsername: 'testuser'
  },
  hCard: {
    givenName: 'Test Person',
    category: 'Person'
  }
}

describe('HomeHead', () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: mockSiteMetadata
      }
    })
  })

  it('renders the component', () => {
    const { getByTestId } = render(<HomeHead />)
    expect(getByTestId('seo')).toBeInTheDocument()
  })

  it('passes correct site metadata to Seo component', () => {
    const { getByTestId } = render(<HomeHead />)
    const seoElement = getByTestId('seo')

    expect(seoElement).toHaveAttribute('data-title', 'Home')
    expect(seoElement).toHaveAttribute('data-description', 'Test description')
  })

  it('renders Open Graph meta tags', () => {
    const { container } = render(<HomeHead />)

    const urlMeta = container.querySelector('meta[property="og:url"]')
    const typeMeta = container.querySelector('meta[property="og:type"]')

    expect(urlMeta).toHaveAttribute('content', 'https://test.com')
    expect(typeMeta).toHaveAttribute('content', 'website')
  })

  it('renders structured data with person schema', () => {
    const { container } = render(<HomeHead />)
    const script = container.querySelector('script[type="application/ld+json"]')

    expect(script).toBeInTheDocument()
    const structuredData = JSON.parse(script.textContent)

    expect(structuredData['@type']).toBe('Person')
    expect(structuredData.name).toBe('Test Person')
    expect(structuredData.url).toBe('https://test.com')
    expect(structuredData.sameAs).toEqual(['https://twitter.com/testuser', 'https://x.com/testuser'])
  })

  it('uses baseURL when available instead of siteUrl', () => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          ...mockSiteMetadata,
          baseURL: 'https://base.com'
        }
      }
    })

    const { container } = render(<HomeHead />)
    const urlMeta = container.querySelector('meta[property="og:url"]')

    expect(urlMeta).toHaveAttribute('content', 'https://base.com')
  })

  it('handles missing social data gracefully', () => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          ...mockSiteMetadata,
          social: {}
        }
      }
    })

    const { container } = render(<HomeHead />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const structuredData = JSON.parse(script.textContent)

    expect(structuredData.sameAs).toBeUndefined()
  })

  it('sets organization schema type when hCard category is Organization', () => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          ...mockSiteMetadata,
          hCard: {
            givenName: 'Test Org',
            category: 'Organization'
          }
        }
      }
    })

    const { container } = render(<HomeHead />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const structuredData = JSON.parse(script.textContent)

    expect(structuredData['@type']).toBe('Organization')
  })

  it('uses fallback values when metadata is missing', () => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {}
      }
    })

    const { getByTestId, container } = render(<HomeHead />)
    const seoElement = getByTestId('seo')

    expect(seoElement).toHaveAttribute('data-title', 'Home')
    expect(seoElement).toHaveAttribute('data-description', 'A personal website and digital garden built with Gatsby.')

    const script = container.querySelector('script[type="application/ld+json"]')
    const structuredData = JSON.parse(script.textContent)
    expect(structuredData.name).toBe('Person')
  })
})
