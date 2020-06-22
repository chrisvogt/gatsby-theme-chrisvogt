import { useEffect, useState } from 'react'
import fetchInstagramPosts from '../api/personal-api/fetch-instagram-posts'

const useInstagramPosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const posts = await fetchInstagramPosts()
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
