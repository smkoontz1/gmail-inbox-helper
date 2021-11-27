import axios from 'axios'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { GoogleOAuthContext } from '../contexts/GoogleOAuthContext'
import { Message, MessageListResponse } from '../types/google/Message'

export const useUserMessages = (): UseQueryResult<Message[]> => {
  const { userIdentity } = useContext(GoogleOAuthContext)
  const userId = userIdentity?.profileObj?.googleId
  const token = userIdentity?.tokenObj?.access_token

  return useQuery('messages', async () => {
    const listResponse = await axios.get<MessageListResponse>(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          maxResults: 10,
        }
      })

    const messagePromises = listResponse?.data?.messages.map(async (message) => {
      const messageResponse = await axios.get<Message>(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${message.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            format: 'full'
          }
        })

      return messageResponse?.data
    })

    if (messagePromises) {
      return await Promise.all(messagePromises)
    }

    return []
  },
    {
      retry: false,
      enabled: !!token
    })
}