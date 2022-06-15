// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { API_URL } from "../../../lib/api"
import { encrypt } from "../../../lib/cryptr"
import { SessionWithRole } from "../../../typings/component"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  const body = (req.body)
  const session = await getSession({ req })
  const user = session as SessionWithRole
  if (!user) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }
  try {
    const apiResponse = await fetch(`${API_URL}/api/v1/iklan/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: encrypt(
          `${user.user?.email}:${user.role}:${user.expires}`
        ),
      },
      body,
    })
    const result = await apiResponse.json()
    if(result.message) throw new Error(result.message)
    res.status(200).json(result)
  } catch (e: unknown) {
    const error = e as Error
    console.error(error)
    res.status(500).json({
      error: error.message,
    })
  }
}
