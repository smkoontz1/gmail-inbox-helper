require('dotenv').config()

import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose, { Schema } from 'mongoose'
import { mockEmails, MessageDTO } from '../test_data/mockData'
import { rootHandler } from './lib/routeHandlers/rootHandler'
import { tokensHandler } from './lib/routeHandlers/tokensHandler'
import { downloadHandler } from './lib/routeHandlers/emails/download/downloadHandler'
import { logToLogFile } from './lib/util/logUtil'
import { emailsHandler } from './lib/routeHandlers/emails/emailsHandler'

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
  app.get('/emails', emailsHandler)
  app.post('/emails/download', downloadHandler)

  app.use((err: Error, req: Request, res: Response, next: unknown) => {
    logToLogFile(`\n\n${err.stack}\n\n`)
    
    console.error(err.stack)
    res.status(500).send('Lol, whoops.')
  })

  app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`)
  })
}
