// selectors/goodreads.js
import { createSelector } from 'reselect'
import { getGoodreadsWidget } from '../reducers/widgets'

const EMPTY_COLLECTION = []
const EMPTY_OBJECT = {}

const selectGoodreadsData = state => getGoodreadsWidget(state).data ?? EMPTY_OBJECT

export const getBooks = createSelector([selectGoodreadsData], data => {
  const booksCollection = data.collections?.recentlyReadBooks ?? EMPTY_COLLECTION

  return booksCollection.filter(({ thumbnail }) => Boolean(thumbnail)).slice(0, 12)
})

export const getMetrics = createSelector([selectGoodreadsData], data => {
  const metrics = []

  const friendsCount = data.profile?.friendsCount
  const readCount = data.profile?.readCount

  if (friendsCount) {
    metrics.push({ displayName: 'Friends', id: 'friends-count', value: friendsCount })
  }

  if (readCount) {
    metrics.push({ displayName: 'Books Read', id: 'read-count', value: readCount })
  }

  return metrics
})

export const getUserStatus = createSelector([selectGoodreadsData], data => {
  const updates = data.collections?.updates ?? EMPTY_COLLECTION

  return updates.find(({ type }) => type === 'userstatus' || type === 'review') ?? EMPTY_OBJECT
})

export const getProfileDisplayName = createSelector([selectGoodreadsData], data => data.profile?.name)

export const getHasFatalError = state => getGoodreadsWidget(state).state === 'FAILURE'
export const getIsLoading = state => getGoodreadsWidget(state).state !== 'SUCCESS'
