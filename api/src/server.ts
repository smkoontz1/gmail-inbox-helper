require('dotenv').config()

import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose, { Schema } from 'mongoose'
import { mockEmails, MessageDTO } from '../test_data/mockData'
import { rootHandler } from './lib/routeHandlers/rootHandler'
import {
  tokensHandler,
} from './lib/routeHandlers/tokensHandler'
import { downloadHandler } from './lib/routeHandlers/emails/downloadHandler'

main().catch(console.error)

async function main() {
  // Mongo
  const uri = 'mongodb://localhost:27017/gmail_emails'
  await mongoose.connect(uri)

  // Express
  const app = express()
  const port = 3002
  const whitelist = ['http://localhost:3000']

  app.use(
    cors({
      origin: (origin, callback) => {
        // allow requests with no origin
        if (!origin) return callback(null, true)
        if (whitelist.indexOf(origin) === -1) {
          var message =
            "The CORS policy for this origin doesn't " +
            'allow access from the particular origin.'
          return callback(new Error(message), false)
        }
        return callback(null, true)
      },
    })
  )

  app.get('/', rootHandler)
  app.get('/tokens', tokensHandler)
  app.post('/emails/download', downloadHandler)

  app.use((err: Error, req: Request, res: Response, next: unknown) => {
    console.error(err.stack)
    res.status(500).send('Lol, whoops.')
  })

  app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`)
  })

  // for (const email of mockEmails) {
  //   const { id, messageTo, messageFrom, subject, snippet, dateSent } = email

  //   let sender = await Sender.findOne({ fromAddress: messageFrom })
  //   if (!sender) {
  //     sender = await Sender.create({ fromAddress: messageFrom })
  //   }

  //   const createdEmail = await Email.create({
  //     messageId: id,
  //     messageTo,
  //     messageFrom: sender._id,
  //     subject,
  //     snippet,
  //     dateSent,
  //   })

  //   await sender.updateOne({ $push: { emails: createdEmail } })
  // }
}
