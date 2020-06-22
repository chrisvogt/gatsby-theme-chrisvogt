import React from 'react'
import renderer from 'react-test-renderer'
import Navigation from './navigation'
import useNavigationData from '../../hooks/use-navigation-data'

jest.mock('../../hooks/use-navigation-data')

describe('Footer/Navigation', () => {
  useNavigationData.mockImplementation(() => ({
    footer: [
      {
        slug: 'about-me',
        path: '/about',
        title: 'About Me',
        text: 'About Me'
      }
    ]
  }))

  it('matches the snapshot', () => {
    const tree = renderer.create(<Navigation />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders hyperlinks for the navigation items', () => {
    const testRenderer = renderer.create(<Navigation />)
    const testInstance = testRenderer.root
    expect(testInstance.findAllByType('a').length).toBe(1)
  })
})
