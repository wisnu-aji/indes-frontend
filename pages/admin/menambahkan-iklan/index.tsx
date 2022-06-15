import { useSession } from "next-auth/react"
import { FC } from "react"
import { AdminLayout } from "../../../layout"
import { SessionWithRole } from "../../../typings/component"
import Error from "next/error"
const MenambahkanIklan: FC = () => {
  const sesion = useSession()
  const data = sesion.data as SessionWithRole | null
  if (data && data.role !== "admin-utama") {
    return <Error statusCode={403} />
  }
  return (
    <AdminLayout>
      <div>Menambahkan Iklan</div>
    </AdminLayout>
  )
}


export default MenambahkanIklan
