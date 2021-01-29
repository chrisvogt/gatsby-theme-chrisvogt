import get from 'lodash/get'

const initialState = {
  config: {},
  dataSources: {}
}

export const FETCH_DATASOURCE_SUCCESS = 'FETCH_DATASOURCE_SUCCESS'
export const FETCH_DATASOURCE_FAILURE = 'FETCH_DATASOURCE_FAILURE'

export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const INIT = 'INIT'

export const getDataSourceId = action => get(action, 'payload.dataSourceId')
export const getError = action => get(action, 'payload.error')
export const getData = action => get(action, 'payload.data')

function widgets(state = initialState, action) {
  switch (action.type) {
    case 'INIT_WIDGET_CONFIG':
      state.config = action.payload
      return state
    case FETCH_DATASOURCE_SUCCESS:
    case FETCH_DATASOURCE_FAILURE:
      const dataSourceId = getDataSourceId(action)
      const data = getData(action)
      const error = getError(state)

      state.dataSources[dataSourceId] = {
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
