import axios from 'axios'
import { useEffect, useState } from 'react'

const useDataSource = dataSourceURL => {
  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(dataSourceURL)
        // NOTE(chrisvogt): factor out data.payload from here once all endpoints
        // return data in a consistent structure.
        setData(data.payload || data)
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to fetch response from data source', err)
        setError(err)
      }
    })()
  }, [dataSourceURL])

  return {
    data,
    error,
    isLoading
  }
}

export default useDataSource
