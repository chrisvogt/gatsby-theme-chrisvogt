import axios from 'axios'
import isFunction from 'lodash/isFunction'

const fetchDataSource = (widgetId, dataSourceURL, selectorFunc) => {
  return async function fetchDataSourceThunk(dispatch) {
    try {
      const { data } = await axios.get(dataSourceURL)
      dispatch({
        type: 'FETCH_DATASOURCE_SUCCESS',
        payload: {
          widgetId,
          data: isFunction(selectorFunc) ? selectorFunc(data) : data
        }
      })
    } catch (error) {
      dispatch({
        type: 'FETCH_DATASOURCE_FAILURE',
        payload: {
          widgetId,
          error
        }
      })
    }
  }
}

export default fetchDataSource
