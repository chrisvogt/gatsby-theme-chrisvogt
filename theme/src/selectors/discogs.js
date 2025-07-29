import { createSelector } from 'reselect'
import { getDiscogsWidget } from '../reducers/widgets'

const EMPTY_OBJECT = {}

const selectDiscogsData = state => getDiscogsWidget(state).data ?? EMPTY_OBJECT

export const getMetrics = createSelector([selectDiscogsData], data => {
  const metrics = []
  const rawMetrics = data.metrics ?? {}

  // Transform object metrics to array format
  Object.entries(rawMetrics).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      metrics.push({
        displayName: key,
        id: key.toLowerCase().replace(/\s+/g, '-'),
        value: value
      })
    }
  })

  return metrics
})

export const getReleases = createSelector([selectDiscogsData], data => {
  return data.collections?.releases || []
})

export const getProfileURL = createSelector([selectDiscogsData], data => {
  return data.profile?.profileURL || 'https://www.discogs.com'
})