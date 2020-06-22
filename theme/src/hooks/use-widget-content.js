import { useEffect, useState } from 'react'
import fetchWidgetContent from '../api/metrics/fetch-widget-content'

const useWidgetContent = widgetId => {
  const [content, setContent] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const payload = await fetchWidgetContent(widgetId)
      setContent(payload)
      setIsLoading(false)
    })()
  }, [widgetId])

  return {
    isLoading,
    content
  }
}

export default useWidgetContent
