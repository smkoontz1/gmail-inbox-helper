import React from 'react'
import './App.css'
import { NavBar } from './components/NavBar/NavBar'
import { EmailTable } from './components/EmailTable/EmailTable'
import { GoogleOAuthContext } from './contexts/GoogleOAuthContext'
import { useGoogleOAuthContext } from './hooks/useGoogleOAuthContext'

function App() {
  const googleOAuth = useGoogleOAuthContext()

  return (
    <div className="App">
      <GoogleOAuthContext.Provider value={googleOAuth}>
        <NavBar/>
        <EmailTable />
      </GoogleOAuthContext.Provider>
    </div>
  )
}

export default App
