import { FETCH_DATASOURCE_SUCCESS, FETCH_DATASOURCE_FAILURE } from '../reducers/widgets'

// Track ongoing requests to prevent duplicates
const ongoingRequests = new Map()

const fetchDataSource = (widgetId, url) => {
  return async function fetchDataSourceThunk(dispatch) {
    // Check if there's already an ongoing request for this widget
    if (ongoingRequests.has(widgetId)) {
      return // Skip if request is already in progress
    }

    // Mark this request as ongoing
    ongoingRequests.set(widgetId, true)

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
    } finally {
      // Remove from ongoing requests
      ongoingRequests.delete(widgetId)
    }
  }
}

export default fetchDataSource
