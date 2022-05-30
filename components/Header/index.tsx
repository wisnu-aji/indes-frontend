import { useSession } from "next-auth/react"
import { FC } from "react"
import { Account, SessionWithRole } from "../Account"
import style from "./style.module.css"

export const Header: FC = () => {
  const sesion = useSession()
  const data = sesion.data as SessionWithRole | null

  return (
    <div className={style.container}>
      <div className={style.title}>
        {!data
          ? "Dashboard"
          : data.role === "admin-utama"
          ? "Admin Utama Dashboard"
          : "Admin Dashboard"}
      </div>
      <Account />
    </div>
  )
}
