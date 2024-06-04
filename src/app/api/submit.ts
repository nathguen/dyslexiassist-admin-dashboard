import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  // const id = await createItem(data)

  // @TODO call the auth login endpoint
  // https://auth.dyslexiassist.com/auth/login
  const resp = await axios.post("https://auth.dyslexiassist.com/auth/login", data)

  
  res.status(200).json(resp)
}