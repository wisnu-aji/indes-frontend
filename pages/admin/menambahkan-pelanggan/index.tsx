import { FC } from "react"
import { MenambahkanPelangganForm } from "../../../components/MenambahkanPelangganForm"
import { AdminLayout } from "../../../layout"

const MenambahkanPelanggan: FC = () => {
  return (
    <AdminLayout>
      <MenambahkanPelangganForm />
    </AdminLayout>
  )
}

export default MenambahkanPelanggan
