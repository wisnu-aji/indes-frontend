import { FC, MouseEventHandler, useEffect, useRef, useState } from "react"
import style from "./style.module.css"
import { useSession } from "next-auth/react"
import { adminOption, adminUtamaOption } from "../../lib/option"
import { SessionWithRole } from "../../typings/component"
import Link from "next/link"
import { useRouter } from "next/router"

const Close: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="black"
  >
    <path
      fillRule="evenodd"
      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
)

const Open: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
)
export const SideBar: FC = () => {
  const session = useSession()
  const router = useRouter()
  const sideBar = useRef<null | HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const data = session.data as SessionWithRole
  const handleShow = (close?: boolean) => {
    if (sideBar.current) {
      if (close) {
        setShow(false)
        sideBar.current.classList.add(style.hide)
        return
      }

      if (!show) {
        sideBar.current.classList.remove(style.hide)
      } else {
        sideBar.current.classList.add(style.hide)
      }
      setShow((v) => !v)
    }
  }

  useEffect(() => {
    if (sideBar.current && show) {
      if (sideBar.current) {
        setShow(false)
        sideBar.current.classList.add(style.hide)
      }
    }
  }, [show])
  if (session.status === "loading" || session.status === "unauthenticated")
    return <></>
  const option = data.role === "admin-utama" ? adminUtamaOption : adminOption

  return (
    <div className={style.container} ref={sideBar}>
      {option.map(({ name, url }) => {
        return (
          <div
            key={url}
            className={
              style.link + ` ${router.pathname === url ? style.linkActive : ""}`
            }
            onClick={() => {
              router.push(url)
            }}
          >
            <div className={style.linkButton}>{name}</div>
          </div>
        )
      })}
      <div className={style.buttonToShow} onClick={() => handleShow()}>
        {show ? <Close /> : <Open />}
      </div>
    </div>
  )
}
