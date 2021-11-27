import axios from 'axios'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { GoogleOAuthContext } from '../contexts/GoogleOAuthContext'

interface Message {
  id: string
  snippet: string
  payload: unknown
  sizeEstimate: number
  raw: string
}

export const useUserMessages = (): UseQueryResult<any> => {
  const { userIdentity } = useContext(GoogleOAuthContext)

  return useQuery('messages', async () => {
    const response = await axios.get<any>(`https://gmail.googleapis.com/gmail/v1/users/${userIdentity?.profileObj?.googleId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${userIdentity?.tokenObj?.access_token}`
        },
        params: {
          maxResults: 10,
        }
      })

    return response?.data
  },
    {
      retry: false,
      enabled: !!userIdentity?.tokenObj?.access_token
    })
}