import React from 'react'
import renderer from 'react-test-renderer'
import LastPullRequest from './last-pull-request'

describe('Widget/GitHub/LastPullRequest', () => {
  describe('snapshots', () => {
    it('matches the loading state snapshot', () => {
      const tree = renderer
        .create(<LastPullRequest pullRequest={{}} isLoading />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('matches the repository variant snapshot', () => {
      const mockPullRequest = {
        number: 42,
        repository: {
          name: 'Fake Project'
        },
        title: "Add fake information to the fake project's repository",
        url: 'https://www.github.com/chrisvogt/null/pulls/42'
      }
      const tree = renderer
        .create(<LastPullRequest pullRequest={mockPullRequest} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
