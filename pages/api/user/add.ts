// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { API_URL } from "../../../lib/api"
import { encrypt } from "../../../lib/cryptr"
import { SessionWithRole } from "../../../typings/component"

export type Data = {
  _id: number
  nama_iklan: string
  expired: string
  gambar: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  const body = (req.body)
  console.log(body)
  const session = await getSession({ req })
  const user = session as SessionWithRole
  console.log(user)
  try {
    const apiResponse = await fetch(`${API_URL}/api/v1/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: encrypt(
          `${user.user?.email}:${user.role}:${user.expires}`
        ),
      },
      body,
    })
    const result = await apiResponse.json()
    console.log(result)
    if(result.message) throw new Error(result.message)
    res.status(200).json(result)
  } catch (e: unknown) {
    const error = e as Error
    console.log(error)
    res.status(500).json({
      error: error.message,
    })
  }
}
