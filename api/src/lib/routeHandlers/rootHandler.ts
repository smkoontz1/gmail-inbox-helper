import { Request, Response } from 'express'

export const rootHandler = async (req: Request, res: Response) => {
  res.send('Hello World')
}