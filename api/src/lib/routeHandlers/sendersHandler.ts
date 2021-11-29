import { Request, Response } from 'express'
import { getSenders } from '../util/mongoUtil'

export const sendersHandler = async (req: Request, res: Response) => {
  const senders = await getSenders()

  res.send(senders)
}