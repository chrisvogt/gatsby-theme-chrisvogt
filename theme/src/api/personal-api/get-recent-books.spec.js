import axios from 'axios'

import getRecentBooks from './get-recent-books'
import recentlyReadBooksFixture from '../../../__mocks__/instagram.mock.json'

const mockAxiosResponse = {
  data: recentlyReadBooksFixture
}

jest.mock('axios')

describe('getRecentBooks', () => {
  it('defaults to an empty array on successful response with no books', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({}))
    await expect(getRecentBooks()).resolves.toEqual([])
  })

  it('fetches, selects, and returns expected data from the expected API endpoint', async () => {
    axios.mockImplementationOnce(() => Promise.resolve(mockAxiosResponse))
    await expect(getRecentBooks()).resolves.toEqual(recentlyReadBooksFixture)
  })

  it('serializes errors for rejected requests', async () => {
    const errorMessage = 'Something went wrong!'
    axios.mockImplementationOnce(() => Promise.reject(errorMessage))
    await expect(getRecentBooks()).resolves.toEqual({ error: errorMessage })
  })
})
