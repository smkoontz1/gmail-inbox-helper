import React from 'react'
import './App.css'
import { NavBar } from './components/NavBar/NavBar'
import { EmailTable } from './components/EmailTable/EmailTable'
import { GoogleOAuthContext } from './contexts/GoogleOAuthContext'
import { useGoogleOAuthContext } from './hooks/useGoogleOAuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()
  const googleOAuth = useGoogleOAuthContext()

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthContext.Provider value={googleOAuth}>
          <NavBar />
          <EmailTable />
        </GoogleOAuthContext.Provider>
      </QueryClientProvider>
    </div>
  )
}

export default App
