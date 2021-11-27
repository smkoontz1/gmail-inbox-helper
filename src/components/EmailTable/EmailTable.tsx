import { ReactElement, useContext } from 'react'
import { GoogleOAuthContext } from '../../contexts/GoogleOAuthContext'
import { useUserMessages } from '../../hooks/useUserMessages'
import axios from 'axios'

interface Message {
  id: string
  snippet: string
  payload: unknown
  sizeEstimate: number
  raw: string
}

export const EmailTable = (): ReactElement => {
  const { data, isError, isLoading } = useUserMessages()

  // TODO: react query
  // const response = await getMessages(profileObj.googleId, tokenObj.access_token)
  
  return (
    <p>{isLoading ? '' : JSON.stringify(data)}</p>
  )
}