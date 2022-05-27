import { useSession, signIn, signOut } from "next-auth/react"
import React, { FC, useState } from "react"
import style from "./style.module.css"

const Logout: FC = () => {
  const data = useSession()

  return (
    <div>
      <button onClick={() => signOut()}>Keluar</button>
    </div>
  )
}

export const Account: FC = () => {
  const [show, setShow] = useState(false)
  const { data } = useSession()
  if (!data || !data.user)
    return (
      <div className={style.container} onClick={() => signIn('google')}>
        <button className={style.login} onClick={() => signIn('google')}>Masuk</button>
      </div>
    )
  return (
    <div className={style.container} onClick={() => setShow((v) => !v)}>
      <img className={style.userPicture} src={data.user.image!} />
      <div className={style.userName}>

      {show ? <Logout /> : data.user.name}
      </div>
    </div>
  )
}
