import { gmail_v1 } from 'googleapis'
import { Sender } from '../mongoose/models/Sender'
import { Email } from '../mongoose/models/Email'

const HEADER_NAMES = {
  date: 'Date',
  from: 'From',
  subject: 'Subject',
  to: 'To',
}

const getHeaderValue = (
  message: gmail_v1.Schema$Message,
  headerName: string
) => {
  const value = message.payload?.headers?.find(
    (header) => header.name?.toLowerCase() === headerName.toLowerCase()
  )?.value
  return value || ''
}

export const saveEmailMessage = async (message: gmail_v1.Schema$Message) => {
  if (!message.id) {
    return
  }
  
  const existingEmail = await Email.findOne({ messageId: message.id })
  if (existingEmail) {
    return
  }
  
  const fromAddress = getHeaderValue(message, HEADER_NAMES.from)
  const messageTo = getHeaderValue(message, HEADER_NAMES.to)
  const subject = getHeaderValue(message, HEADER_NAMES.subject)
  const dateSent = getHeaderValue(message, HEADER_NAMES.date)

  let sender = await Sender.findOne({ fromAddress })
  if (!sender) {
    sender = await Sender.create({ fromAddress })
  }

  const createdEmail = await Email.create({
    messageId: message.id,
    messageTo,
    messageFrom: sender._id,
    subject,
    snippet: message.snippet,
    dateSent,
  })

  await sender.updateOne({ $push: { emails: createdEmail } })
}