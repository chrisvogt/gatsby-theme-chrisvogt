export const FETCH_DATASOURCE_SUCCESS = 'FETCH_DATASOURCE_SUCCESS'
export const FETCH_DATASOURCE_FAILURE = 'FETCH_DATASOURCE_FAILURE'

export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const INIT = 'INIT'

export const getError = action => action?.payload?.error
export const getData = action => action?.payload?.data?.payload
export const getWidgetId = action => action?.payload?.widgetId

export const getGitHubWidget = state => state.widgets?.github || {}
export const getGoodreadsWidget = state => state.widgets?.goodreads || {}
export const getInstagramWidget = state => state.widgets?.instagram || {}
export const getSpotifyWidget = state => state.widgets?.spotify || {}

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
