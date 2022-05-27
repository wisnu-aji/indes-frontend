import { useSession, signOut, signIn } from "next-auth/react"
import { FC } from "react"
import { AdminLayout } from "../../layout"
import { useRouter } from "next/router"

const Admin: FC = () => {
  return <AdminLayout>index</AdminLayout>
}

export default Admin
