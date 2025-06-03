import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import SteamWidget from './steam-widget'

// Mock child components to isolate the test
jest.mock('../call-to-action', () => props => <div data-testid='CallToAction'>{props.title}</div>)
jest.mock('../recent-posts/post-card', () => props => <div data-testid='PostCard'>{props.title}</div>)
jest.mock('../profile-metrics-badge', () => props => (
  <div data-testid='ProfileMetricsBadge'>{JSON.stringify(props.metrics)}</div>
))
jest.mock('../widget', () => props => <div data-testid='Widget'>{props.children}</div>)
jest.mock('../widget-header', () => props => <div data-testid='WidgetHeader'>{props.children}</div>)

// Mock hooks and selectors
jest.mock('../../../hooks/use-site-metadata', () => () => ({
  widgets: { steam: { url: 'https://example.com/steam-feed' } }
}))
jest.mock('../../../selectors/metadata', () => ({
  getSteamWidgetDataSource: () => 'https://example.com/steam-feed'
}))
jest.mock('../../../actions/fetchDataSource', () => jest.fn(() => ({ type: 'MOCK_ACTION' })))

const mockStore = configureStore([]) // no middleware

describe('SteamWidget', () => {
  it('renders correctly with sample data', () => {
    const store = mockStore({
      widgets: {
        steam: {
          state: 'SUCCESS',
          data: {
            metrics: [{ label: 'Games Played', value: 5 }],
            profile: {
              displayName: 'Chris',
              profileURL: 'https://steamcommunity.com/id/chrisvogt'
            },
            collections: {
              recentlyPlayedGames: [
                {
                  id: '123',
                  displayName: 'Half-Life',
                  playTime2Weeks: 120,
                  images: { header: 'https://example.com/halflife.jpg' }
                },
                {
                  id: '456',
                  displayName: 'Portal',
                  playTime2Weeks: 45,
                  images: { header: 'https://example.com/portal.jpg' }
                }
              ]
            }
          }
        }
      }
    })

    const tree = renderer
      .create(
        <Provider store={store}>
          <SteamWidget />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders loading state', () => {
    const store = mockStore({
      widgets: {
        steam: {
          state: 'LOADING'
        }
      }
    })

    const tree = renderer
      .create(
        <Provider store={store}>
          <SteamWidget />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
