import getPinnedItems from './get-pinned-items'

const githubContentFixture = require('../../../../../__mocks__/github-widget.mock.json')
const { payload } = githubContentFixture

const getTotalCount = payload => {
  const {
    user: {
      pinnedItems: { totalCount }
    }
  } = payload
  return totalCount
}

describe('getPinnedItems', () => {
  it('selects pinned items from the GitHub widget content response payload', () => {
    const totalCount = getTotalCount(payload)
    const result = getPinnedItems(payload)
    expect(result.length).toEqual(totalCount)
  })
})
