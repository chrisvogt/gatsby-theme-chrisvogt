import React from 'react'
import renderer from 'react-test-renderer'
import HomeWidgets from './home-widgets'

import GitHub from '../components/widgets/github'
import RecentPosts from '../components/widgets/recent-posts'
import Spotify from '../components/widgets/spotify'

jest.mock('../components/widgets/github')
jest.mock('../components/widgets/recent-posts')
jest.mock('../components/widgets/spotify')

const getMockWidgetComponent = id => <div className={`MOCK__${id}Widget`}></div>

describe('HomeWidgets', () => {
  GitHub.mockImplementation(() => getMockWidgetComponent('GitHub'))
  RecentPosts.mockImplementation(() => getMockWidgetComponent('RecentPosts'))
  Spotify.mockImplementation(() => getMockWidgetComponent('Spotify'))

  it('matches the snapshot', () => {
    const tree = renderer.create(<HomeWidgets />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('widgets', () => {
    let testInstance

    beforeAll(() => {
      const testRenderer = renderer.create(<HomeWidgets />)
      testInstance = testRenderer.root
    })

    it('renders the GitHub widget', () => {
      expect(
        testInstance.findByProps({ className: 'MOCK__GitHubWidget' }).type
      ).toBe('div')
    })

    it('renders the Recent Posts widget', () => {
      expect(
        testInstance.findByProps({ className: 'MOCK__RecentPostsWidget' }).type
      ).toBe('div')
    })

    it('renders the Spotify widget', () => {
      expect(
        testInstance.findByProps({ className: 'MOCK__SpotifyWidget' }).type
      ).toBe('div')
    })
  })
})
