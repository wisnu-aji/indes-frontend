import { useSession } from "next-auth/react"
import Error from "next/error"
import { useRouter } from "next/router"
import { FC } from "react"
import { AdminLayout } from "../../../layout"
import { SessionWithRole } from "../../../typings/component"

const MenambahkanAdmin: FC = () => {
  const sesion = useSession()
  const data = sesion.data as SessionWithRole | null

  if (sesion.status === "loading" || sesion.status === "unauthenticated") {
    return (
      <AdminLayout>
        <></>
      </AdminLayout>
    )
  }

  if (data && data.role !== "admin-utama") {
    return <Error statusCode={403} />
  }
  return (
    <AdminLayout>
      <div>Menambahkan admin</div>
    </AdminLayout>
  )
}

export default MenambahkanAdmin
