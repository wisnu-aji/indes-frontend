import { signIn, useSession } from "next-auth/react"
import { FC } from "react"
import { BelumLogin } from "../../components/BelumLogin"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import style from "./style.module.css"

export const AdminLayout: FC = ({ children }) => {
  const { status } = useSession()

  return (
    <div className={style.container}>
      <Header />
      <div className={style.content}>
        {status === "authenticated"
          ? children
          : status === "unauthenticated"
          ? <BelumLogin />
          : "Loading"}
      </div>
      <Footer />
    </div>
  )
  return <></>
}
