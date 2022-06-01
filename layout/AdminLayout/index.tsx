import { useSession } from "next-auth/react"
import { FC } from "react"
import { BelumLogin } from "../../components/BelumLogin"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { Loading } from "../../components/Loading"
import { SideBar } from "../../components/SideBar"
import style from "./style.module.css"

export const AdminLayout: FC = ({ children }) => {
  const { status } = useSession()
  return (
    <div className={style.container}>
      <Header />
      <div className={style.content}>
        {status === "authenticated" ? (
          <div className={style.loggedIn}>
            <SideBar />
            <div className={style.contentChildren}>{children}</div>
          </div>
        ) : status === "unauthenticated" ? (
          <BelumLogin />
        ) : (
          <div className={style.loading}>
            <Loading />
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
  return <></>
}
