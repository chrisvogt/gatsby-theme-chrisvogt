import axios from 'axios'

import getInstagramPosts from './get-instagram-posts'
import instagramFixture from '../../../__mocks__/instagram.mock.json'

const mockAxiosResponse = {
  data: instagramFixture
}

jest.mock('axios')

describe('getInstagramPosts', () => {
  it('defaults to an empty array on successful response with no posts', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({}))
    await expect(getInstagramPosts()).resolves.toEqual([])
  })

  it('fetches, selects, and returns expected data from the expected API endpoint', async () => {
    axios.mockImplementationOnce(() => Promise.resolve(mockAxiosResponse))
    await expect(getInstagramPosts()).resolves.toEqual(
      instagramFixture.result.photos
    )
  })

  it('serializes errors for rejected requests', async () => {
    const errorMessage = 'Something went wrong!'
    axios.mockImplementationOnce(() => Promise.reject(errorMessage))
    await expect(getInstagramPosts()).resolves.toEqual({ error: errorMessage })
  })
})
