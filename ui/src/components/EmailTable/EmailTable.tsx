import { ReactElement, useContext } from 'react'
import { GoogleOAuthContext } from '../../contexts/GoogleOAuthContext'
import { useUserMessages } from '../../hooks/useUserMessages'
import axios from 'axios'
import { useHelloWorld } from '../../hooks/useHelloWorld'

interface Message {
  id: string
  snippet: string
  payload: unknown
  sizeEstimate: number
  raw: string
}

export const EmailTable = (): ReactElement => {
  // const { data, isError, isLoading } = useUserMessages()
  const { data } = useHelloWorld()

  // console.log(data)

  return (
    <p>{data}</p>
  )
  // return (
  //   <p>{isLoading ? '' : JSON.stringify(data)}</p>
  // )
}