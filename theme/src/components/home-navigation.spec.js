import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeNavigation from './home-navigation'
import useSiteMetadata from '../hooks/use-site-metadata'
import useNavigationData from '../hooks/use-navigation-data'

jest.mock('../hooks/use-site-metadata')
jest.mock('../hooks/use-navigation-data')

const mockSiteMetadata = {
  widgets: {
    github: { widgetDataSource: 'https://fake-api.chrisvogt.me/social/github' },
    goodreads: { widgetDataSource: 'https://fake-api.chrisvogt.me/social/goodreads' },
    instagram: { widgetDataSource: 'https://fake-api.chrisvogt.me/social/instagram' },
    spotify: { widgetDataSource: 'https://fake-api.chrisvogt.me/social/spotify' }
  }
}

const mockNavigationData = {
  header: {
    home: [
      {
        path: '#instagram',
        slug: 'instagram',
        text: 'Instagram',
        title: 'Instagram'
      },
      {
        path: '#github',
        slug: 'github',
        text: 'GitHub',
        title: 'GitHub'
      },
      {
        path: '#goodreads',
        slug: 'goodreads',
        text: 'Goodreads',
        title: 'Goodreads'
      },
      {
        path: '#spotify',
        slug: 'spotify',
        text: 'Spotify',
        title: 'Spotify'
      }
    ]
  }
}

describe('HomeNavigation', () => {
  beforeEach(() => {
    useSiteMetadata.mockImplementation(() => mockSiteMetadata)
    useNavigationData.mockImplementation(() => mockNavigationData)
  })

  it('renders all links when all widgets are enabled', () => {
    render(<HomeNavigation />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Latest Posts')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Goodreads')).toBeInTheDocument()
    expect(screen.getByText('Spotify')).toBeInTheDocument()
  })

  it('renders only mandatory links when no widgets are enabled', () => {
    useSiteMetadata.mockImplementation(() => ({ widgets: {} }))
    useNavigationData.mockImplementation(() => ({ header: { home: [] } }))
    render(<HomeNavigation />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Latest Posts')).toBeInTheDocument()
    expect(screen.queryByText('Instagram')).not.toBeInTheDocument()
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
    expect(screen.queryByText('Goodreads')).not.toBeInTheDocument()
    expect(screen.queryByText('Spotify')).not.toBeInTheDocument()
  })

  it('highlights the active section on scroll', () => {
    render(<HomeNavigation />)

    const instagramSection = document.createElement('div')
    instagramSection.id = 'instagram'
    document.body.appendChild(instagramSection)
    instagramSection.getBoundingClientRect = jest.fn(() => ({
      top: window.innerHeight / 2 - 1 // Simulate it being in view
    }))

    fireEvent.scroll(window)
    expect(screen.getByText('Instagram').classList).toContain('active')
  })

  it('does not break when an invalid icon is provided', () => {
    useSiteMetadata.mockImplementation(() => ({ widgets: {} }))
    useNavigationData.mockImplementation(() => ({ header: { home: [] } }))
    render(<HomeNavigation />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument() // No icons should render
  })

  it('renders the correct aria-label for navigation', () => {
    render(<HomeNavigation />)
    const nav = document.querySelector('nav[aria-label="On-page navigation"]')
    expect(nav).not.toBeNull()
    expect(nav.getAttribute('aria-label')).toBe('On-page navigation')
  })
})
