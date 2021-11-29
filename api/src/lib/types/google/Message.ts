interface Header {
  name: string
  value: string
}

interface MessagePartBody {
  attachmentId: string
  size: number
  data: string
}

interface MessagePart {
    partId: string
    mimeType: string
    filename: string
    headers: Header[]
    body: MessagePartBody
    parts: MessagePart[]
}

export interface Message {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  historyId: string
  internalDate: string
  payload: MessagePart
  sizeEstimate: number
  raw: string
}

export interface MessageListResponse {
  messages: Partial<Message>[]
  nextPageToken: string
  resultSizeEstimate: number
}