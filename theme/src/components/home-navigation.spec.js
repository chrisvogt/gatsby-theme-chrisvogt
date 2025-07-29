import React from 'react'
import renderer from 'react-test-renderer'

import { TestProvider } from '../testUtils'
import HomeNavigation from './home-navigation'
import useNavigationData from '../hooks/use-navigation-data'

jest.mock('../hooks/use-navigation-data')

const mockNavigationData = {
  header: {
    home: [
      {
        path: '/about',
        slug: 'about',
        text: 'About'
      },
      {
        path: '/blog',
        slug: 'blog',
        text: 'Blog'
      }
    ]
  }
}

describe('HomeNavigation', () => {
  beforeEach(() => {
    useNavigationData.mockImplementation(() => mockNavigationData)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <TestProvider>
          <HomeNavigation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles navigation data with empty home items', () => {
    useNavigationData.mockImplementation(() => ({
      header: {
        home: []
      }
    }))

    const tree = renderer
      .create(
        <TestProvider>
          <HomeNavigation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles navigation data with missing header', () => {
    useNavigationData.mockImplementation(() => ({}))

    const tree = renderer
      .create(
        <TestProvider>
          <HomeNavigation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles navigation data with null values', () => {
    useNavigationData.mockImplementation(() => null)

    const tree = renderer
      .create(
        <TestProvider>
          <HomeNavigation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles navigation items with missing icon reactIcon', () => {
    const navigationWithMissingIcons = {
      header: {
        home: [
          {
            path: '/test',
            slug: 'test',
            text: 'Test'
          }
        ]
      }
    }
    useNavigationData.mockImplementation(() => navigationWithMissingIcons)

    const tree = renderer
      .create(
        <TestProvider>
          <HomeNavigation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles navigation items with discogs slug for icon mapping', () => {
    const navigationWithDiscogs = {
      header: {
        home: [
          {
            path: '/discogs',
            slug: 'discogs',
            text: 'Discogs'
          }
        ]
      }
    }
    useNavigationData.mockImplementation(() => navigationWithDiscogs)

    const tree = renderer
      .create(
        <TestProvider>
          <HomeNavigation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles navigation items with complex slug names', () => {
    const navigationWithComplexSlugs = {
      header: {
        home: [
          {
            path: '/complex-slug',
            slug: 'complex-slug',
            text: 'Complex Slug'
          }
        ]
      }
    }
    useNavigationData.mockImplementation(() => navigationWithComplexSlugs)

    const tree = renderer
      .create(
        <TestProvider>
          <HomeNavigation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
