// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"

export type Data = {
  _id: number;
  nama_iklan: string;
  expired: string;
  gambar: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Data>>
) {


  const session = await getSession({ req })
  console.log(session)
  res.status(200).json([
    {
      _id: 1,
      nama_iklan: "iklan1",
      expired: "2022-12-08T14:40:00.175Z",
      gambar: "https://source.unsplash.com/random/300x100",
    },
    {
      _id: 2,
      nama_iklan: "iklan2",
      expired: "2022-12-08T14:40:00.175Z",
      gambar: "https://source.unsplash.com/random/250x100",
    },
    {
      _id: 3,
      nama_iklan: "iklan3",
      expired: "2022-12-08T14:40:00.175Z",
      gambar: "https://source.unsplash.com/random/350x100",
    },
    {
      _id: 4,
      nama_iklan: "iklan4",
      expired: "2022-12-08T14:40:00.175Z",
      gambar: "https://source.unsplash.com/random/300x100",
    },
    {
      _id: 5,
      nama_iklan: "iklan5",
      expired: "2022-11-08T14:40:00.175Z",
      gambar: "https://source.unsplash.com/random/300x100",
    },
  ]);
}
