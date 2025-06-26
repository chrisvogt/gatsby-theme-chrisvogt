import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeUIProvider } from 'theme-ui'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Footer from './footer'
import Layout from './layout'
import TopNavigation from './top-navigation'

// Mock Footer and TopNavigation components
jest.mock('./footer')
jest.mock('./top-navigation')

describe('Layout', () => {
  TopNavigation.mockImplementation(() => <div className='MOCK__TopNavigation'></div>)
  Footer.mockImplementation(() => <div className='MOCK__Footer'></div>)

  // Mock theme
  const mockTheme = {
    colors: {
      background: '#fdf8f5',
      text: '#111',
      modes: {
        dark: {
          background: '#1e1e2f',
          text: '#fff'
        }
      }
    }
  }

  // Create mock store
  const mockStore = configureStore([])
  const store = mockStore({
    audioPlayer: {
      isVisible: false,
      soundcloudId: null
    }
  })

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeUIProvider theme={mockTheme}>
            <Layout>
              <div className='fake-website'>
                <h1>Fake Website</h1>
                <p>Lorum ipsum dolor sit amet.</p>
              </div>
            </Layout>
          </ThemeUIProvider>
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders children without main wrapper when disableMainWrapper is true', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeUIProvider theme={mockTheme}>
            <Layout disableMainWrapper={true}>
              <div className='fake-website'>
                <h1>Fake Website</h1>
                <p>Lorum ipsum dolor sit amet.</p>
              </div>
            </Layout>
          </ThemeUIProvider>
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('hides header when hideHeader is true', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeUIProvider theme={mockTheme}>
            <Layout hideHeader={true}>
              <div className='fake-website'>
                <h1>Fake Website</h1>
                <p>Lorum ipsum dolor sit amet.</p>
              </div>
            </Layout>
          </ThemeUIProvider>
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
