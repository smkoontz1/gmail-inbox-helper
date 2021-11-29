import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { SenderResponse } from '../types/responses/Sender'

export const useSenders = (): UseQueryResult<SenderResponse[]> => {
  return useQuery('senders', async () => {
    const response = await axios.get<SenderResponse[]>(`http://localhost:3002/senders`)

    return response?.data
  })
}