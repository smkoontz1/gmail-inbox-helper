import React, { useState, useCallback } from 'react'
import {
  GoogleOAuthContext,
  GoogleUserIdentity,
} from '../contexts/GoogleOAuthContext'

export const useGoogleOAuthContext = (): GoogleOAuthContext => {
  const [userIdentity, setUserIdentity] = useState<GoogleUserIdentity>(
    {} as GoogleUserIdentity
  )

  const setNewUserIdentity = useCallback((newUserIdentity: GoogleUserIdentity): void => {
    setUserIdentity(newUserIdentity)
  }, [])

  return {
    userIdentity,
    setUserIdentity,
  }
}
