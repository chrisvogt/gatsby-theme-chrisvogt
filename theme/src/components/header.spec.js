import React from 'react'
import renderer from 'react-test-renderer'
import Header from './header'

describe('Header', () => {
  it('matches the snapshot', () => {
    const headline = 'Wow!'
    const tree = renderer
      .create(
        <Header showSwoop hideTopPadding>
          {headline}
        </Header>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
