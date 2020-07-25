import React from 'react'
import renderer from 'react-test-renderer'

import Content from './content'
import Footer from './footer'
import { TestProvider } from '../../testUtils'
import useSiteMetadata from '../../hooks/use-site-metadata'

jest.mock('./content')
jest.mock('../../hooks/use-site-metadata')

describe('Footer', () => {
  Content.mockImplementation(() => <div className='MOCK__FooterContent'></div>)
  const mockFooterText = '© 2019-2020 Chris Vogt'

  useSiteMetadata.mockImplementation(() => ({
    footerText: mockFooterText
  }))

  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <TestProvider>
          <Footer />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
