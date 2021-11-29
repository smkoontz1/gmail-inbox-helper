import { Request, Response } from 'express'
import axios, { AxiosError } from 'axios'
import qs from 'qs'

export type TokensRequestQuery = {
  code: string
}

export const tokensHandler = async (req: Request, res: Response) => {
  const { code } = req.query as TokensRequestQuery

  try {
    const response = await axios.request({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      paramsSerializer: (params) => qs.stringify(params),
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code',
      },
    })

    res.send(response?.data)
  } catch (err) {
    console.log((err as AxiosError).response)
    console.log((err as AxiosError).message)
    res.sendStatus(500)
  }
}
