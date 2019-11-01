import { useEffect, useState } from 'react'
import getWidgetContent from '../api/metrics/get-widget-content'

const useWidgetContent = () => {
  const type = 'github'
  const [content, setContent] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const payload = await getWidgetContent(type)
      setContent(payload)
      setIsLoading(false)
    })()
  }, [])

  return {
    isLoading,
    content
  }
}

export default useWidgetContent
