import { useEffect, useState } from 'react'
import fetchRecentBooks from '../api/personal-api/get-recent-books'

const useRecentBooks = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const books = await fetchRecentBooks()
      setBooks(books)
      setIsLoading(false)
    })()
  }, [])

  return [isLoading, books]
}

export default useRecentBooks
