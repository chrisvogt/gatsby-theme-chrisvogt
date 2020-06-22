import axios from 'axios'

export default async widgetId => {
  try {
    const { data: { payload } = {} } = await axios(
      'https://metrics.chrisvogt.me/api/widget-content',
      {
        params: {
          widget: widgetId
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
