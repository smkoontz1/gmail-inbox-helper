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

  console.log(data)

  return (
    <p>{isLoading ? '' : JSON.stringify(data)}</p>
  )
}