import { Request, Response } from 'express'

export const emailsHandler = async (req: Request, res: Response) => {
  res.send('Hello World')
}