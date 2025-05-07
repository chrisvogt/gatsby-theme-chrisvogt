import { FETCH_DATASOURCE_SUCCESS, FETCH_DATASOURCE_FAILURE } from '../reducers/widgets'

const fetchDataSource = (widgetId, url) => {
  return async function fetchDataSourceThunk(dispatch) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()

      dispatch({
        type: FETCH_DATASOURCE_SUCCESS,
        payload: {
          widgetId,
          data
        }
      })
    } catch (error) {
      dispatch({
        type: FETCH_DATASOURCE_FAILURE,
        payload: {
          widgetId,
          error
        }
      })
    }
  }
}

export default fetchDataSource
