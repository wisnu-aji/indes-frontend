import { useSession } from "next-auth/react"
import Head from "next/head"
import { FC } from "react"
import { Account, SessionWithRole } from "../Account"
import style from "./style.module.css"

export const Header: FC = () => {
  const sesion = useSession()
  const data = sesion.data as SessionWithRole | null
  const title = !data
    ? "Dashboard"
    : data.role === "admin-utama"
    ? "Admin Utama Dashboard"
    : "Admin Dashboard"
  return (
    <div className={style.container}>
      <Head>
        <title>{title} - INDES</title>
      </Head>
      <div className={style.title}>{title}</div>
      <Account />
    </div>
  )
}
