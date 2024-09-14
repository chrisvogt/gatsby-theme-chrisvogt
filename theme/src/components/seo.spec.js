import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Seo from './seo'
import useSiteMetadata from '../hooks/use-site-metadata'
import { useThemeUI } from 'theme-ui'
import { getLanguageCode, getTitle, getTitleTemplate, getTwitterUsername } from '../selectors/metadata'

// Mocking the necessary hooks and selectors
jest.mock('../hooks/use-site-metadata')
jest.mock('theme-ui', () => ({
  useThemeUI: jest.fn(),
}))
jest.mock('../selectors/metadata', () => ({
  getLanguageCode: jest.fn(),
  getTitle: jest.fn(),
  getTitleTemplate: jest.fn(),
  getTwitterUsername: jest.fn(),
}))

describe('Seo Component', () => {
  beforeEach(() => {
    // Mock the default metadata and theme values
    useSiteMetadata.mockReturnValue({
      title: 'Default Site Title',
    })
    useThemeUI.mockReturnValue({
      theme: { colors: { background: '#ffffff' } },
    })
    getLanguageCode.mockReturnValue('en')
    getTitle.mockReturnValue('Default Site Title')
    getTitleTemplate.mockReturnValue('%s | My Site')
    getTwitterUsername.mockReturnValue('@example')
  })

  it('renders default SEO metadata tags', () => {
    render(<Seo title="Home" description="This is the homepage" keywords="home,seo" />)
  
    // Check if <title> tag is rendered correctly
    expect(document.title).toBe('Home | My Site')
  
    // Check if description meta tag is present
    const descriptionMeta = document.querySelector('meta[name="description"]')
    expect(descriptionMeta).toHaveAttribute('content', 'This is the homepage')
  
    // Check if keywords meta tag is present
    const keywordsMeta = document.querySelector('meta[name="keywords"]')
    expect(keywordsMeta).toHaveAttribute('content', 'home,seo')
  
    // Check if theme-color meta tag is present
    const themeColorMeta = document.querySelector('meta[name="theme-color"]')
    expect(themeColorMeta).toHaveAttribute('content', '#ffffff')
  
    // Check if og:title meta tag is present
    const ogTitleMeta = document.querySelector('meta[property="og:title"]')
    expect(ogTitleMeta).toHaveAttribute('content', 'Home | My Site')
  
    // Check if twitter:title meta tag is present
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]')
    expect(twitterTitleMeta).toHaveAttribute('content', 'Home | My Site')
  
    // Check if twitter:creator meta tag is present
    const twitterCreatorMeta = document.querySelector('meta[name="twitter:creator"]')
    expect(twitterCreatorMeta).toHaveAttribute('content', '@example')
  })
  

  it('renders article-specific meta tags when article prop is true', () => {
    render(<Seo title="Article Title" article />)

    // Check if og:type meta tag is set to article
    const ogTypeMeta = document.querySelector('meta[property="og:type"]')
    expect(ogTypeMeta).toHaveAttribute('content', 'article')
  })

  it('renders image meta tags when image URL is provided', () => {
    render(<Seo title="Image Post" image="https://example.com/image.jpg" />)

    // Check if og:image meta tag is present
    const ogImageMeta = document.querySelector('meta[property="og:image"]')
    expect(ogImageMeta).toHaveAttribute('content', 'https://example.com/image.jpg')

    // Check if twitter:image meta tag is present
    const twitterImageMeta = document.querySelector('meta[name="twitter:image"]')
    expect(twitterImageMeta).toHaveAttribute('content', 'https://example.com/image.jpg')
  })
})
