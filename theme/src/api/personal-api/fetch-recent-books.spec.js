import axios from 'axios'

import fetchRecentBooks from './fetch-recent-books'
import recentlyReadBooksFixture from '../../../__mocks__/instagram.mock.json'

const mockAxiosResponse = {
  data: recentlyReadBooksFixture
}

jest.mock('axios')

describe('api/personal-api/fetch-recent-books', () => {
  it('defaults to an empty array on successful response with no books', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({}))
    await expect(fetchRecentBooks()).resolves.toEqual([])
  })

  it('fetches, selects, and returns expected data from the expected API endpoint', async () => {
    axios.mockImplementationOnce(() => Promise.resolve(mockAxiosResponse))
    await expect(fetchRecentBooks()).resolves.toEqual(recentlyReadBooksFixture)
  })

  it('serializes errors for rejected requests', async () => {
    const errorMessage = 'Something went wrong!'
    axios.mockImplementationOnce(() => Promise.reject(errorMessage))
    await expect(fetchRecentBooks()).resolves.toEqual({ error: errorMessage })
  })
})
