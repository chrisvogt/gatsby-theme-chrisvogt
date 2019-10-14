import axios from 'axios'

export default async () => {
  try {
    const { data: books = [] } = await axios(
      'https://recently-read.chrisvogt.me'
    )
    return books
  } catch (error) {
    return {
      error
    }
  }
}
