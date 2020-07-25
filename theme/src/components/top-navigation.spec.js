import React from 'react'
import renderer from 'react-test-renderer'

import { TestProvider } from '../testUtils'
import TopNavigation from './top-navigation'
import useNavigationData from '../hooks/use-navigation-data'
import useSiteMetadata from '../hooks/use-site-metadata'

const mockSiteMetadata = {
  title: 'My Personal Blog & Portfolio'
}

const mockNavigationData = {
  header: {
    left: [
      {
        path: '/about-me',
        slug: 'about-me',
        text: 'About Me',
        title: 'About Me'
      }
    ]
  }
}

jest.mock('../hooks/use-navigation-data')
jest.mock('../hooks/use-site-metadata')

describe('TopNavigation', () => {
  useNavigationData.mockImplementation(() => mockNavigationData)
  useSiteMetadata.mockImplementation(() => mockSiteMetadata)
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <TestProvider>
          <TopNavigation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
