import { ReactElement, useContext } from 'react'
import { GoogleOAuthContext } from '../../contexts/GoogleOAuthContext'
import { useUserMessages } from '../../hooks/useUserMessages'
import { useSenders } from '../../hooks/useSenders'
import axios from 'axios'
import { useHelloWorld } from '../../hooks/useHelloWorld'
import { useDownloadEmails } from '../../hooks/useDownloadEmails'
import { Box, Button, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { SenderResponse } from '../../types/responses/Sender'

const columns: GridColDef[] = [
  {
    field: 'fromAddress' as keyof SenderResponse,
    headerName: 'Sender',
    width: 400,
  },
  {
    field: 'emailCount' as keyof SenderResponse,
    headerName: 'Count',
    width: 100,
  },
]

const getRows = (senders: SenderResponse[]): {
  id: string
  fromAddress: string
  emailCount: number
}[] => {
  return senders.map((sender) => {
    return {
      id: sender.fromAddress,
      fromAddress: sender.fromAddress,
      emailCount: sender.emailCount
    }
  })
}

export const EmailTable = (): ReactElement => {
  // const { data, isError, isLoading } = useUserEmails()
  const {
    data: sendersData,
    isError: isSendersError,
    isLoading: isSendersLoading,
  } = useSenders()
  const downloadEmails = useDownloadEmails()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 800,
      }}
    >
      {/* {downloadEmails.isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {downloadEmails.isError ? (
            <p>Error</p>
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
        </>
      )} */}
      {isSendersLoading ? (
        <></>
      ) : (
        <DataGrid
          rows={getRows(sendersData || [])}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </Box>
  )
}
