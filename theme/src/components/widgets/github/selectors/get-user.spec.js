import getUser from './get-user'

const githubContentFixture = require('../../../../../__mocks__/github-widget.mock.json')
const { payload } = githubContentFixture

const keysUsedByWidget = ['followers', 'following', 'repositories', 'status']

describe('getPullRequests', () => {
  it('selects pull requests from the GitHub widget content response payload', () => {
    const result = getUser(payload)
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(keysUsedByWidget)
    )
  })
})
