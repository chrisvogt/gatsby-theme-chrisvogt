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
})
