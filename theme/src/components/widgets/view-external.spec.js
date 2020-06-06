import React from 'react'
import renderer from 'react-test-renderer'
import ViewExternal from './view-external'

describe('ViewExternal', () => {
  it('renders correctly', () => {
    const platform = 'GitHub'
    const tree = renderer
      .create(<ViewExternal platform={platform}>{platform}</ViewExternal>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
