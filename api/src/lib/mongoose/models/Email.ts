import mongoose, { Schema } from 'mongoose'
import { Sender } from './Sender'

interface Email {
  messageId: string
  messageTo: string
  messageFrom: Sender
  subject: string
  snippet: string
  dateSent: Date
}

const emailSchema = new Schema<Email>({
  messageId: String,
  messageTo: String,
  messageFrom: { type: Schema.Types.ObjectId, ref: 'Sender' },
  subject: String,
  snippet: String,
  dateSent: Date
})

const Email = mongoose.model('Email', emailSchema)
export { Email }