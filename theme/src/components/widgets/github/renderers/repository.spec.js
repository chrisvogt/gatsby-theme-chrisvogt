import React from 'react'
import renderer from 'react-test-renderer'
import Repository from './repository'

describe('GitHub Repository Renderer', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Repository
          description='GatsbyJS blog theme with built-in social widgets for creatives and developers.'
          nameWithOwner='chrisvogt/gatsby-theme-private-sphere'
          openGraphImageUrl='https://avatars0.githubusercontent.com/u/1934719?s=400&v=4'
          updatedAt='2020-03-26T12:11:58Z'
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
