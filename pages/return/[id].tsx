import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { Footer } from "../../components/Footer"
import { Loading } from "../../components/Loading"
import Ombak from "../../components/Ombak"
import OmbakFooter from "../../components/OmbakFooter"
import { PelangganType } from "../../typings/component"
import style from "./style.module.css"

const Return: FC = () => {
  const [data, setData] = useState<PelangganType | null>(null)
  const param = useRouter()
  const id = param.query.id as string
  useEffect(() => {
    if (!param.isReady) return
    if (!id) return
    fetch("https://api.wisnuaji.my.id/api/v1/search/" + id)
      .then((data) => data.json())
      .then((pelanggan) => {
        setData(pelanggan)
      })
  }, [param.isReady, id])

  if (!data) return <Loading />

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>Selamat {data.nama}!</h1>
        <p>Pembayaran anda telah berhasil!</p>
        <table cellSpacing={0}>
          <tbody>
            <tr>
              <td>ID Transaksi</td>
              <td>{param.query.trx_id}</td>
            </tr>
            <tr>
              <td>Via</td>
              <td>
                {param.query.channel} ({param.query.via})
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{param.query.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Ombak />
      <div className={style.filler} />
      <OmbakFooter />
      <Footer />
    </div>
  )
}

export default Return
