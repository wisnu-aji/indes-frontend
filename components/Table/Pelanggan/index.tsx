import { FC, useEffect } from "react"
import { usePelanggan } from "../../../hooks/use-pelanggan"
import { limitPage } from "../../../lib/option"
import { IndesPelangganListAPI, Pelanggan } from "../../../typings/component"
import style from "./style.module.css"

export const TablePelanggan: FC = () => {
  const {
    pelangganList,
    status,
    statusPelanggan,
    query,
    page,
    setPage,
    totalPage,
    setPelangganList,
    setTotalPage,
    setStatusPelanggan,
    setQuery,
  } = usePelanggan()
  const handleSubmit = async () => {
    try {
      const payload = {
        page,
        limit: limitPage,
        sortBy: "nama",
        status: statusPelanggan,
      }

      const response = await fetch("/api/user/list", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as IndesPelangganListAPI
      setPelangganList(data.list)
      setTotalPage(Math.ceil(data.total / limitPage))
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    handleSubmit()

    return () => {
      setPelangganList([])
      setQuery("")
      setStatusPelanggan(null)
      setPage(1)
    }
  }, [])

  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr className={style.head}>
            <th className={style.cell}>id</th>
            <th className={style.cell}>Nama</th>
            <th className={style.cell}>Alamat</th>
            <th className={style.cell}>Telepon</th>
            <th className={style.cell}>Riwayat</th>
            <th className={style.cell}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {pelangganList.length &&
            pelangganList.map((pelanggan) => {
              return (
                <tr
                  key={`pelanggan-${pelanggan._id}`}
                  className={style.pelanggan}
                >
                  <td className={style.cell}>{pelanggan._id}</td>
                  <td className={style.cell}>{pelanggan.nama}</td>
                  <td className={style.cell}>{pelanggan.alamat}</td>
                  <td className={style.cell}>{pelanggan.telepon}</td>
                  <td className={style.cell + ' ' + style.center}>
                    History ({pelanggan.riwayatPembayaran.length})
                  </td>
                  <td className={style.cell+ ' ' + style.center}>Manage</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {!pelangganList.length && (
        <div className={style.nodata}>tidak ada data</div>
      )}
    </div>
  )
}
