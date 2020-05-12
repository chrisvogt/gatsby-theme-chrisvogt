import { useEffect, useState } from 'react'
import getRecentBooks from '../api/personal-api/get-recent-books'

const useRecentBooks = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const books = await getRecentBooks()
      setBooks(books)
      setIsLoading(false)
    })()
  }, [])

  return [isLoading, books]
}

export default useRecentBooks
