import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { ReactElement, useContext, useState } from 'react'
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from 'react-google-login'
import { GoogleOAuthContext } from '../../contexts/GoogleOAuthContext'

export const NavBar = (): ReactElement => {
  const { userIdentity, setUserIdentity } = useContext(GoogleOAuthContext)

  const onLoginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response)
    const { profileObj, tokenObj } = response as GoogleLoginResponse
    setUserIdentity({ profileObj, tokenObj })
  }

  const onLoginFailure = (error: any) => {
    console.log(error)
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Gmail Inbox Helper
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" component="div" padding="10px">
              Welcome, {userIdentity?.profileObj?.name}
            </Typography>
            <GoogleLogin
              clientId="CLIENT_ID.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
