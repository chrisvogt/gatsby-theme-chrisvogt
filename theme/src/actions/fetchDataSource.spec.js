import axios from 'axios'
import fetchDataSource from './fetchDataSource'

import { FETCH_DATASOURCE_SUCCESS, FETCH_DATASOURCE_FAILURE } from '../reducers/widgets'

jest.mock('axios')

const mockResponse = {
  data: {
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
}

describe('fetchDataSource', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches data and dispatches the expected action on success', async () => {
    axios.get.mockResolvedValue(mockResponse)

    const url = 'https://www.fake-url.com'
    const widgetId = 'mockWidgetId'

    const fetch = fetchDataSource(widgetId, url)
    const dispatch = jest.fn()

    await fetch(dispatch)

    expect(axios.get.mock.calls).toEqual([[url]])

    expect(dispatch.mock.calls).toEqual([
      [
        {
          payload: {
            ...mockResponse,
            widgetId
          },
          type: FETCH_DATASOURCE_SUCCESS
        }
      ]
    ])
  })

  it('fetches data and dispatches the expected action on failure', async () => {
    const error = new Error('Something went wrong.')

    axios.get.mockRejectedValue(error)

    const url = 'https://www.fake-url.com'
    const widgetId = 'mockWidgetId'

    const fetch = fetchDataSource(widgetId, url)
    const dispatch = jest.fn()

    await fetch(dispatch)

    expect(axios.get.mock.calls).toEqual([[url]])

    expect(dispatch.mock.calls).toEqual([
      [
        {
          payload: {
            error,
            widgetId
          },
          type: FETCH_DATASOURCE_FAILURE
        }
      ]
    ])
  })
})
