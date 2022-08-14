import React from 'react'
import renderer from 'react-test-renderer'

import HomeNavigation from './home-navigation'
import useSiteMetadata from '../hooks/use-site-metadata'

jest.mock('../hooks/use-site-metadata')

const mockSiteMetadata = {
  widgets: {
    github: {
      widgetDataSource: 'https://fake-api.chrisvogt.me/social/github'
    },
    goodreads: {
      widgetDataSource: 'https://fake-api.chrisvogt.me/social/goodreads'
    },
    instagram: {
      widgetDataSource: 'https://fake-api.chrisvogt.me/social/instagram'
    },
    spotify: {
      widgetDataSource: 'https://fake-api.chrisvogt.me/social/spotify'
    }
  }
}

describe('HomeNavigation', () => {
  useSiteMetadata.mockImplementation(() => mockSiteMetadata)
  it('matches the snapshot', () => {
    const tree = renderer.create(<HomeNavigation />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
