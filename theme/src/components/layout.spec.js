import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'theme-ui'

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

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <Layout>
            <div className='fake-website'>
              <h1>Fake Website</h1>
              <p>Lorum ipsum dolor sit amet.</p>
            </div>
          </Layout>
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
