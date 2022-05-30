import { FC } from "react"
import { Statistics } from "../../components/Statistics"
import { AdminLayout } from "../../layout"

const Admin: FC = () => {
  return (
    <AdminLayout>
      <Statistics />
    </AdminLayout>
  )
}

export default Admin
