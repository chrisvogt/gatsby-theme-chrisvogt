import { useEffect, useState } from 'react'
import getWidgetContent from '../api/metrics/get-widget-content'

const useWidgetContent = widgetId => {
  const [content, setContent] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const payload = await getWidgetContent(widgetId)
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
