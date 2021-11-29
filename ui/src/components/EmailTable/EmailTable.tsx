import { ReactElement, useContext } from 'react'
import { GoogleOAuthContext } from '../../contexts/GoogleOAuthContext'
import { useUserMessages } from '../../hooks/useUserMessages'
import axios from 'axios'
import { useHelloWorld } from '../../hooks/useHelloWorld'
import { useDownloadEmails } from '../../hooks/useDownloadEmails'
import { Box, Button, CircularProgress } from '@mui/material'

interface Message {
  id: string
  snippet: string
  payload: unknown
  sizeEstimate: number
  raw: string
}

export const EmailTable = (): ReactElement => {
  // const { data, isError, isLoading } = useUserEmails()
  const downloadEmails = useDownloadEmails()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
      }}
    >
      {downloadEmails.isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            downloadEmails.mutate()
          }}
        >
          Download Emails
        </Button>
      )}
    </Box>
  )
}
