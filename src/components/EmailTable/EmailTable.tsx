import { ReactElement, useContext } from 'react'
import { GoogleOAuthContext } from '../../contexts/GoogleOAuthContext'
import axios from 'axios'

interface Message {
  id: string
  snippet: string
  payload: unknown
  sizeEstimate: number
  raw: string
}

const getMessages = async (userId: string, accessToken: string): Promise<any[]> => {
  const response = await axios.get<any[]>(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      maxResults: 10,
    }
  })

  return response?.data
}

export const EmailTable = (): ReactElement => {
  const { userIdentity } = useContext(GoogleOAuthContext)
  const { profileObj, tokenObj } = userIdentity

  // TODO: react query
  // const response = await getMessages(profileObj.googleId, tokenObj.access_token)
  
  return (
    <p>{userIdentity?.tokenObj?.access_token}</p>
  )
}