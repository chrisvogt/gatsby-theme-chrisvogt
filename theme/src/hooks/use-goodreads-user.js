import { useEffect, useState } from 'react'
import getWidgetContent from '../api/metrics/get-widget-content'

const useGoodreadsUser = () => {
  const [user, setUser] = useState({ profile: {}, updates: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const goodreadsUser = await getWidgetContent('goodreads')
      setUser(goodreadsUser)
      setIsLoading(false)
    })()
  }, [])

  return [isLoading, user]
}

export default useGoodreadsUser
