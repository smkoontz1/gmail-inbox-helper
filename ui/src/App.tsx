import './App.css'
import { NavBar } from './components/NavBar/NavBar'
import { EmailTable } from './components/EmailTable/EmailTable'
import { GoogleOAuthContext } from './contexts/GoogleOAuthContext'
import { useGoogleOAuthContext } from './hooks/useGoogleOAuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()
  const googleOAuth = useGoogleOAuthContext()
  const { tokenObj } = googleOAuth.userIdentity

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthContext.Provider value={googleOAuth}>
          <NavBar />
          {tokenObj ? <EmailTable /> : <p>Not Authed. Click the sign in button.</p>}
        </GoogleOAuthContext.Provider>
      </QueryClientProvider>
    </div>
  )
}

export default App
