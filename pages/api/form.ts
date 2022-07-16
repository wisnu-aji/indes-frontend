// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma, PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { SessionWithRole } from "../../typings/component"

const client = new PrismaClient()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getSession({ req })
  const user = session as SessionWithRole
  if (req.method === "GET" && user) {
    const data = await client.formPelanggan.findMany()
    res.json(data)
    return
  }
  if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body)
    const data = await client.formPelanggan.delete({ where: { id } })
    res.json(data)
    return
  }
  const body = JSON.parse(req.body)

  if (!body) {
    res.status(401).json({ ok: false })
    return
  }

  await client.formPelanggan.create({ data: body })
  res.status(200).json({ ok: true })
  return
}
