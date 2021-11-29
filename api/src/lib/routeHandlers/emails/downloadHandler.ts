import { Request, Response } from 'express'
import { getGoogleOAuthClient } from '../../google/apiClient'
import { gmail_v1, google } from 'googleapis'

export const downloadHandler = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.replace('Bearer', '').trim()

  console.log('Access token', accessToken)

  res.sendStatus(200)

  // const oauthClient = getGoogleOAuthClient()
  // oauthClient.setCredentials({
  //   access_token: accessToken,
  //   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  // })

  // const gmail = google.gmail({
  //   version: 'v1',
  //   auth: oauthClient,
  // })

  // // const numPagesToFetch = 2

  // const messageList = await gmail.users.messages.list({
  //   userId: 'me',
  //   maxResults: 10,
  // })

  // res.send(messageList.data.messages)

  // const listResponse = await axios.get<MessageListResponse>(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       params: {
  //         maxResults: 10,
  //       }
  //     })

  //   const messagePromises = listResponse?.data?.messages.map(async (message) => {
  //     const messageResponse = await axios.get<Message>(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${message.id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         },
  //         params: {
  //           format: 'full'
  //         }
  //       })

  //     return messageResponse?.data
  //   })

  //   if (messagePromises) {
  //     return await Promise.all(messagePromises)
  //   }

  //   return []
}
