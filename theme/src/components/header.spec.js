import React from 'react'
import renderer from 'react-test-renderer'

import Header from './header'
import { TestProvider } from '../testUtils'

describe('Header', () => {
  it('matches the snapshot', () => {
    const headline = 'Wow!'
    const tree = renderer
      .create(
        <TestProvider>
          <Header showSwoop hideTopPadding>
            {headline}
          </Header>
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
