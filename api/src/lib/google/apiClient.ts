import { Common } from 'googleapis'

interface ClientStore {
  client: Common.OAuth2Client
}

const clientStore: ClientStore = {} as ClientStore

export const getGoogleOAuthClient = (): Common.OAuth2Client => {
  if (clientStore.client) {
    return clientStore.client
  }

  const oauth2Client = new Common.OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000'
  )

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      console.log('New Refresh token', tokens.refresh_token)
    }
  })

  clientStore.client = oauth2Client
  return oauth2Client
}
