import axios from 'axios'

export default async () => {
  try {
    const { data: { result: { photos = [] } = {} } = {} } = await axios(
      'https://api.chrisvogt.me/instagram'
    )
    return photos
  } catch (error) {
    return {
      error
    }
  }
}
