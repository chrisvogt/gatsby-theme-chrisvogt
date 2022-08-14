import axios from 'axios'

const fetchDataSource = (widgetId, url) => {
  return async function fetchDataSourceThunk(dispatch) {
    try {
      const { data } = await axios.get(url)
      dispatch({
        type: 'FETCH_DATASOURCE_SUCCESS',
        payload: {
          widgetId,
          data
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
