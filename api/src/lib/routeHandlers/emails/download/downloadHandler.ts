import { Request, Response } from 'express'
import { getGoogleOAuthClient } from '../../../google/apiClient'
import { google } from 'googleapis'
import { saveEmailMessage } from '../../../util/mongoUtil'
import { logToLogFile } from '../../../util/logUtil'

export const downloadHandler = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.replace('Bearer', '').trim()

  const oauthClient = getGoogleOAuthClient()
  oauthClient.setCredentials({
    access_token: accessToken,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  const gmail = google.gmail({
    version: 'v1',
    auth: oauthClient,
  })

  const messageList = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 500,
  })

  const messagePromises = messageList.data.messages?.map(async (message) => {
    const messageResponse = await gmail.users.messages.get({
      userId: 'me',
      id: message.id?.toString()
    })

    return messageResponse.data
  })

  if (messagePromises) {
    const messages = await Promise.all(messagePromises)

    for (const message of messages) {
      console.info('Processing message: ', message.id)
      try {
        await saveEmailMessage(message)
      } catch (err) {
        logToLogFile(`Error processing message: ${message.id}`)
      }
    }

    res.sendStatus(200)
  } else {
    console.error('Something went wrong.')
    res.sendStatus(500)
  }
}
