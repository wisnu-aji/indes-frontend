import { useSession } from "next-auth/react"
import { FC, useEffect, useState } from "react"
import { AdminLayout } from "../../../layout"
import { SessionWithRole } from "../../../typings/component"
import Router from "next/router"
import { FormPelanggan } from "@prisma/client"
import style from "./style.module.css"
import { Modal } from "../../../layout/Modal"
import { PelangganBaru } from "../../../components/Form/PelangganBaru"
import { SavePelangganBaru } from "../../../components/Button/SavePelangganBaru"
import { PelangganBaruForm } from "../../../components/Form/PelangganBaruForm"

const MenambahkanPaket: FC = () => {
  const sesion = useSession()
  const [daftar, setDaftar] = useState<Array<FormPelanggan>>([])
  const data = sesion.data as SessionWithRole | null
  useEffect(() => {
    fetch("/api/form")
      .then((data) => data.json())
      .then((data) => {
        setDaftar(data)
      })
  }, [data])

  return (
    <AdminLayout>
      <div className={style.container}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Telepon</th>
              <th>Paket</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {daftar.length === 0 && (
              <div className={style.nodata}>Tidak ada data</div>
            )}
            {daftar.map((data) => (
              <tr key={data.id}>
                <td>{data.nama}</td>
                <td>{data.alamat}</td>
                <td>{data.telepon}</td>
                <td>{data.paket}</td>
                <td>
                  <Modal label="Tinjau">
                    <PelangganBaruForm pelanggan={data} />
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default MenambahkanPaket
