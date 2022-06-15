import { useSession } from "next-auth/react"
import { FC, useState } from "react"
import { AdminLayout } from "../../../layout"
import { IklanType, SessionWithRole } from "../../../typings/component"
import Error from "next/error"
import Router from "next/router"
import { IklanBaruContext } from "../../../hooks/use-iklan-baru"
import { IklanBaruForm } from "../../../components/Form/IklanBaru"
import { SaveIklanBaru } from "../../../components/Button/SaveIklanBaru"
const MenambahkanIklan: FC = () => {
  const sesion = useSession()
  const [iklanBaru, setIklanBaru] = useState<Omit<IklanType, "_id">>({
    nama_iklan: "",
    gambar: "",
    expired: new Date(),
  })
  const data = sesion.data as SessionWithRole | null
  if (data && data.role !== "admin-utama") {
    Router.push("/admin")
  }
  return (
    <AdminLayout>
      <IklanBaruContext.Provider
        value={{ iklanBaru, setIklanBaru }}
      >
        <IklanBaruForm />
        <SaveIklanBaru />
      </IklanBaruContext.Provider>
    </AdminLayout>
  )
}

export default MenambahkanIklan
