import axios from 'axios'

import fetchInstagramPosts from './get-instagram-posts'
import instagramFixture from '../../../__mocks__/instagram.mock.json'

const mockAxiosResponse = {
  data: instagramFixture
}

jest.mock('axios')

describe('api/personal-api/fetch-instagram-posts', () => {
  it('defaults to an empty array on successful response with no posts', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({}))
    await expect(fetchInstagramPosts()).resolves.toEqual([])
  })

  it('fetches, selects, and returns expected data from the expected API endpoint', async () => {
    axios.mockImplementationOnce(() => Promise.resolve(mockAxiosResponse))
    await expect(fetchInstagramPosts()).resolves.toEqual(
      instagramFixture.result.photos
    )
  })

  it('serializes errors for rejected requests', async () => {
    const errorMessage = 'Something went wrong!'
    axios.mockImplementationOnce(() => Promise.reject(errorMessage))
    await expect(fetchInstagramPosts()).resolves.toEqual({ error: errorMessage })
  })
})
