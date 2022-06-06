import type { NextApiRequest, NextApiResponse } from "next"
import { encrypt } from "../../../lib/cryptr"
import { prisma } from "../../../prisma/connection"

export type Data = {
  ok: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body)
  const admin = await prisma.adminUtama.findFirst()
  try {

    await fetch(process.env.API_URL! + "/api/v1/payment/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: encrypt(
          `${admin?.email}:admin-utama:${Date.now() + 1728e5}`
        ),
      },
      body: req.body,
    })
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false })
  }
}
