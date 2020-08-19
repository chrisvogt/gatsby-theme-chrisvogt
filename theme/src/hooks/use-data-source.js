import axios from 'axios'
import { useEffect, useState } from 'react'

const useDataSource = dataSourceURL => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      console.log(dataSourceURL)
      const { data } = await axios.get(dataSourceURL)
      console.log(dataSourceURL, data)
      // NOTE(chrisvogt): factor out data.payload from here once all endpoints
      // return data in a consistent structure.
      setData(data.payload || data)
      setIsLoading(false)
    })()
  }, [dataSourceURL])

  return {
    isLoading,
    data
  }
}

export default useDataSource
