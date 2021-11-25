import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { ReactElement } from 'react'
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

export const NavBar = (): ReactElement => {
  const onLoginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response)
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
          <GoogleLogin
            clientId="CLIENT_ID.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
