import { FC, useState } from "react"
import { AdminLayout } from "../../../layout"
import { PelangganContext } from "../../../hooks/use-pelanggan-baru"
import { PelangganBaru } from "../../../components/Form/PelangganBaru"

const MengelolaPelanggan: FC = () => {
  return (
    <AdminLayout>
      <div>Mengelola pelanggan</div>
    </AdminLayout>
  )
}

export default MengelolaPelanggan
