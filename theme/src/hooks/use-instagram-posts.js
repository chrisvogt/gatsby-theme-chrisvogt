import { useEffect, useState } from 'react'
import getInstagramPosts from '../api/personal-api/getInstagramPosts'

const useInstagramPosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const posts = await getInstagramPosts()
      setPosts(posts)
      setIsLoading(false)
    })()
  }, [])

  return {
    isLoading,
    posts
  }
}

export default useInstagramPosts
