import React from 'react'
import renderer from 'react-test-renderer'

import Footer from './footer'
import Layout from './layout'
import TopNavigation from './top-navigation'

jest.mock('./footer')
jest.mock('./top-navigation')

describe('Layout', () => {
  TopNavigation.mockImplementation(() => <div className='MOCK__TopNavigation'></div>)
  Footer.mockImplementation(() => <div className='MOCK__Footer'></div>)
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Layout>
          <div className='fake-website'>
            <h1>Fake Website</h1>
            <p>Lorum ipsum dolor sit amet.</p>
          </div>
        </Layout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
