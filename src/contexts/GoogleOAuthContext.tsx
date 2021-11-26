import React from 'react'

interface TokenObj {
  access_token: string
  id_token: string
  login_hint: string
  scope: string
  expires_in: number
  first_issued_at: number
  expires_at: number
}

interface ProfileObj {
  email: string
  familyName: string
  givenName: string
  googleId: string
  imageUrl: string
  name: string
}

export interface GoogleUserIdentity {
  tokenObj: TokenObj
  profileObj: ProfileObj
}

export interface GoogleOAuthContext {
  userIdentity: GoogleUserIdentity
  setUserIdentity: (newUserIdentity: GoogleUserIdentity) => void
}

export const GoogleOAuthContext = React.createContext<GoogleOAuthContext>({
  userIdentity: {} as GoogleUserIdentity,
  setUserIdentity: () => {}
})