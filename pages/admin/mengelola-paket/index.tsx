import { useSession } from "next-auth/react"
import { FC } from "react"
import { AdminLayout } from "../../../layout"
import { SessionWithRole } from "../../../typings/component"
import Error from "next/error"
import Router from "next/router"
const MengelolaPaket: FC = () => {
  const sesion = useSession()
  const data = sesion.data as SessionWithRole | null
  if (data && data.role !== "admin-utama") {
    Router.push("/admin")
  }
  return (
    <AdminLayout>
      <div>Mengelola Paket</div>
    </AdminLayout>
  )
}

export default MengelolaPaket
