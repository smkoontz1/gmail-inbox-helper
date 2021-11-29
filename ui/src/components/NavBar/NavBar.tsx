import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { ReactElement, useContext, useState } from 'react'
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { GoogleOAuthContext } from '../../contexts/GoogleOAuthContext'

export const NavBar = (): ReactElement => {
  const { userIdentity, setNewUserIdentity } = useContext(GoogleOAuthContext)

  const onLoginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response)
    const { profileObj, tokenObj } = response as GoogleLoginResponse
    setNewUserIdentity({ profileObj, tokenObj })
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
              clientId="771093418835-bomf72j92uu2jjbor3325co039ii30s5.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              // accessType="offline"
              // responseType="code"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
              scope={'https://mail.google.com/'}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
