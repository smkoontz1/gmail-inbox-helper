import axios from 'axios'
import { useContext } from 'react'
import { useMutation } from 'react-query'
import { GoogleOAuthContext } from '../contexts/GoogleOAuthContext'

export const useDownloadEmails = () => {
  const { userIdentity } = useContext(GoogleOAuthContext)
  const token = userIdentity.tokenObj.access_token

  return useMutation(() => {
    return axios.post(
      'http://localhost:3002/emails/download',
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  })
}
