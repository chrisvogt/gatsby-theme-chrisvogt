export const FETCH_DATASOURCE_SUCCESS = 'FETCH_DATASOURCE_SUCCESS'
export const FETCH_DATASOURCE_FAILURE = 'FETCH_DATASOURCE_FAILURE'

export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const INIT = 'INIT'

export const getError = action => action?.payload?.error
export const getData = action => action?.payload?.data?.payload
export const getWidgetId = action => action?.payload?.widgetId

export const getGitHubWidget = state => state.widgets?.github || { state: INIT }
export const getGoodreadsWidget = state => state.widgets?.goodreads || { state: INIT }
export const getInstagramWidget = state => state.widgets?.instagram || { state: INIT }
export const getSpotifyWidget = state => state.widgets?.spotify || { state: INIT }
export const getFlickrWidget = state => state.widgets?.flickr || { state: INIT }
export const getSteamWidget = state => state.widgets?.steam || { state: INIT }

function widgets(state = {}, action) {
  switch (action.type) {
    case FETCH_DATASOURCE_SUCCESS:
    case FETCH_DATASOURCE_FAILURE: {
      const data = getData(action)
      const error = getError(action)
      const widgetId = getWidgetId(action)

      return {
        ...state,
        [widgetId]: {
          state: action.type === FETCH_DATASOURCE_SUCCESS ? SUCCESS : FAILURE,
          ...(data ? { data } : {}),
          ...(error ? { error } : {})
        }
      }
    }
    default:
      return {
        ...state
      }
  }
}
export default widgets
