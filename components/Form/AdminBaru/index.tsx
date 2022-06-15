import { FC } from "react"
import { AdminBaru, useAdminBaru } from "../../../hooks/use-admin-baru"
import { AdminType } from "../../../typings/component"
import style from "./style.module.css"

export const AdminBaruForm: FC = () => {
  const { adminBaru, setAdminBaru } = useAdminBaru()

  const handleOnChange = (key: keyof Omit<AdminType, "_id">, input: string) => {
    setAdminBaru({
      ...adminBaru,
      [key]: input,
    })
  }
  return (
    <div className={style.form}>
      <span>Nama</span>
      <input
        type="text"
        placeholder="budi"
        onChange={(e) => handleOnChange("name", e.target.value)}
      />
      <span>Email</span>
      <input
        type="text"
        placeholder="budi@gmail.com"
        onChange={(e) => handleOnChange("email", e.target.value)}
      />
    </div>
  )
}
