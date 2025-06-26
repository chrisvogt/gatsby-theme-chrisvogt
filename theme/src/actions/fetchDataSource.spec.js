import fetchDataSource from './fetchDataSource'
import { FETCH_DATASOURCE_SUCCESS, FETCH_DATASOURCE_FAILURE } from '../reducers/widgets'

const mockResponse = {
  collection: [
    {
      id: 'mock-obj-1',
      name: 'Mock Item #1'
    },
    {
      id: 'mock-obj-2',
      name: 'Mock Item #2'
    }
  ]
}

describe('fetchDataSource (using fetch)', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetches data and dispatches the expected action on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const url = 'https://www.fake-url.com'
    const widgetId = 'mockWidgetId'
    const fetchThunk = fetchDataSource(widgetId, url)
    const dispatch = jest.fn()

    await fetchThunk(dispatch)

    expect(global.fetch).toHaveBeenCalledWith(url)
    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_DATASOURCE_SUCCESS,
      payload: {
        widgetId,
        data: mockResponse
      }
    })
  })

  it('fetches data and dispatches the expected action on failure', async () => {
    const error = new Error('Network error')

    global.fetch = jest.fn().mockRejectedValue(error)

    const url = 'https://www.fake-url.com'
    const widgetId = 'mockWidgetId'
    const fetchThunk = fetchDataSource(widgetId, url)
    const dispatch = jest.fn()

    await fetchThunk(dispatch)

    expect(global.fetch).toHaveBeenCalledWith(url)
    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_DATASOURCE_FAILURE,
      payload: {
        widgetId,
        error
      }
    })
  })

  it('handles HTTP error responses', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404
    })

    const url = 'https://www.fake-url.com'
    const widgetId = 'mockWidgetId'
    const fetchThunk = fetchDataSource(widgetId, url)
    const dispatch = jest.fn()

    await fetchThunk(dispatch)

    expect(global.fetch).toHaveBeenCalledWith(url)
    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_DATASOURCE_FAILURE,
      payload: {
        widgetId,
        error: expect.any(Error)
      }
    })
  })

  it('prevents duplicate requests for the same widgetId', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const url = 'https://www.fake-url.com'
    const widgetId = 'mockWidgetId'
    const dispatch = jest.fn()

    // Create two thunks with the same widgetId
    const fetchThunk1 = fetchDataSource(widgetId, url)
    const fetchThunk2 = fetchDataSource(widgetId, url)

    // Start both requests simultaneously
    const promise1 = fetchThunk1(dispatch)
    const promise2 = fetchThunk2(dispatch)

    await Promise.all([promise1, promise2])

    // Only one fetch call should be made
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
