import mongoose, { Schema } from 'mongoose'
import { Email } from './Email'

interface Sender {
  fromAddress: string,
  emails: Email[]
}

const senderSchema = new Schema<Sender>({
  fromAddress: String,
  emails: [{ type: Schema.Types.ObjectId, ref: 'Email' }]
})

const Sender = mongoose.model('Sender', senderSchema)
export { Sender }