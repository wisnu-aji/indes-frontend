/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react"
import React, { FC, useState } from "react"
import { SessionWithRole } from "../../typings/component"
import style from "./style.module.css"



const Logout: FC = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Keluar</button>
    </div>
  )
}

export const Account: FC = () => {
  const [show, setShow] = useState(false)
  const { data, status } = useSession()

  if (status === "loading") {
    return (
      <div className={style.container}>
        <button className={style.login} disabled>
          Loading...
        </button>
      </div>
    )
  }

  if (!data || !data.user)
    return (
      <div className={style.container} onClick={() => signIn("google")}>
        <button className={style.login} onClick={() => signIn("google")}>
          Masuk
        </button>
      </div>
    )

  const authenticatedData = data as SessionWithRole
  const { user, role } = authenticatedData
  return (
    <div className={style.container} onClick={() => setShow((v) => !v)}>
      <img className={style.userPicture} src={data.user.image!} />
      <div className={style.userName}>{show ? <Logout /> : data.user.name}</div>
    </div>
  )
}
