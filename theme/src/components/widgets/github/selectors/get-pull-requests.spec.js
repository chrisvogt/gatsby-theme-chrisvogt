import getPullRequests from './get-pull-requests'

const githubContentFixture = require('../../../../../__mocks__/github-widget.mock.json')
const { payload } = githubContentFixture

const getTotalCount = payload => {
  const {
    user: {
      pullRequests: { totalCount }
    }
  } = payload
  return totalCount
}

describe('getPullRequests', () => {
  it('selects pull requests from the GitHub widget content response payload', () => {
    const totalCount = getTotalCount(payload)
    const result = getPullRequests(payload)
    expect(result.length).toEqual(totalCount)
  })
})
