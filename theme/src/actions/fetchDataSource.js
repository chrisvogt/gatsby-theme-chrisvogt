import axios from 'axios'
import isFunction from 'lodash/isFunction'

const fetchDataSource = (dataSourceId, dataSourceURL, selectorFunc) => {
  return async function fetchDataSourceThunk(dispatch) {
    try {
      const { data } = await axios.get(dataSourceURL)
      dispatch({
        type: 'FETCH_DATASOURCE_SUCCESS',
        payload: {
          dataSourceId,
          data: isFunction(selectorFunc) ? selectorFunc(data) : data
        }
      })
    } catch (error) {
      dispatch({
        type: 'FETCH_DATASOURCE_FAILURE',
        payload: {
          dataSourceId,
          error
        }
      })
    }
  }
}

export default fetchDataSource
