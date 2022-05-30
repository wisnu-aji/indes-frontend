import { FC, useEffect, useState } from "react"
import style from "./style.module.css"
import { signIn } from "next-auth/react"
import Image from "next/image"
import GoogleButton from "react-google-button"
import { useRouter } from "next/router"

export const BelumLogin: FC = () => {
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (window) {
      const params = new URLSearchParams(window.location.search) 
      const error = params.get("error")
      if (error) {
        setIsError(true)
        router.push(window.location.pathname)
      }
    }

    return () => {
      setIsError(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={style.container}>
      <Image src="/hijab_work.jpg" alt="" width={200} height={200} />
      <div className={style.login}>
        {isError && (
          <div className={style.errorLogin}>Login Gagal</div>
        )}
        <div className={style.loginGreet}>
          Silahkan masuk menggunakan akun Gmail mu
        </div>
        <GoogleButton
          onClick={() => {
            signIn("google")
          }}
        />
      </div>
    </div>
  )
}
