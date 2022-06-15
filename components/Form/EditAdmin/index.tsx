import { FC, useState } from "react"
import { toast } from "react-toastify"
import { AdminType } from "../../../typings/component"
import style from "./style.module.css"

export const EditAdminForm: FC<{ admin: AdminType }> = ({ admin }) => {
  const [data, setData] = useState(admin)
  const handleOnChange = (key: keyof Omit<AdminType, "_id">, input: string) => {
    setData({
      ...data,
      [key]: input,
    })
  }

  const update = async () => {
    const response = await fetch("/api/admin/edit", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const res = await response.json()
    if (res.error) throw new Error(res.error)
    return res

  }
  return (
    <div className={style.container}>
      <div className={style.form}>
        <span>Nama</span>
        <input
          type="text"
          placeholder="budi"
          value={data.name}
          onChange={(e) => handleOnChange("name", e.target.value)}
        />
        <span>Email</span>
        <input
          type="text"
          placeholder="budi@gmail.com"
          value={data.email}
          onChange={(e) => handleOnChange("email", e.target.value)}
        />
      </div>
      <div className={style.save}>
        <button className={style.btn} onClick={() => {
          toast.promise(update, {
            success: "Data berhasil diubah",
            error: "Data gagal diubah",
            pending: "Memperbarui data",
          })
        }}>Update</button>
      </div>
    </div>
  )
}
