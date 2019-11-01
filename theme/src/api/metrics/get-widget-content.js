import axios from 'axios'

export default async type => {
  try {
    const { data: { payload } = {} } = await axios(
      'https://metrics.chrisvogt.me/api/widget-content',
      {
        params: {
          widget: type
        }
      }
    )

    return payload
  } catch (error) {
    return {
      error
    }
  }
}
