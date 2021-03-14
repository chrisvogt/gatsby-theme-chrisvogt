import get from 'lodash/get'

const initialState = {}

export const FETCH_DATASOURCE_SUCCESS = 'FETCH_DATASOURCE_SUCCESS'
export const FETCH_DATASOURCE_FAILURE = 'FETCH_DATASOURCE_FAILURE'

export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const INIT = 'INIT'

export const getError = action => get(action, 'payload.error')
export const getData = action => get(action, 'payload.data')
export const getWidgetId = action => get(action, 'payload.widgetId')

function widgets(state = initialState, action) {
  switch (action.type) {
    case 'INIT_WIDGET_CONFIG':
      state.config = action.payload
      return state
    case FETCH_DATASOURCE_SUCCESS:
    case FETCH_DATASOURCE_FAILURE:
      const data = getData(action)
      const error = getError(state)
      const widgetId = getWidgetId(action)

      state[widgetId] = {
        state: action.type === FETCH_DATASOURCE_SUCCESS ? SUCCESS : FAILURE,
        ...(data ? { data } : {}),
        ...(error ? { error } : {})
      }

      return state
    default:
      return state
  }
}
export default widgets
