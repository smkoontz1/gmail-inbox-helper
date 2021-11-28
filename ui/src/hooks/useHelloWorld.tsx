import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

export const useHelloWorld = (): UseQueryResult<string> => {
  return useQuery('hello-world', async () => {
    const response = await axios.get<string>(`http://localhost:3002/`)

    return response?.data
  })
}