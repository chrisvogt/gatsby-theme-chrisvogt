import { createSelector } from 'reselect'
import { getSteamWidget } from '../reducers/widgets'

const EMPTY_ARRAY = []
const EMPTY_OBJECT = {}

const selectSteamData = state => getSteamWidget(state).data ?? EMPTY_OBJECT

export const getAiSummary = createSelector([selectSteamData], data => data.aiSummary)

export const getMetrics = createSelector([selectSteamData], data => data.metrics ?? EMPTY_ARRAY)

export const getProfileDisplayName = createSelector([selectSteamData], data => data.profile?.displayName)

export const getProfileURL = createSelector([selectSteamData], data => data.profile?.profileURL)

export const getRecentlyPlayedGames = createSelector(
  [selectSteamData],
  data => data.collections?.recentlyPlayedGames ?? EMPTY_ARRAY
)

export const getOwnedGames = createSelector([selectSteamData], data => data.collections?.ownedGames ?? EMPTY_ARRAY)

export const getHasFatalError = state => getSteamWidget(state).state === 'FAILURE'
export const getIsLoading = state => getSteamWidget(state).state !== 'SUCCESS'
