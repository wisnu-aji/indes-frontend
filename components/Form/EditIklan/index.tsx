import { FC, useState } from "react"
import { toast } from "react-toastify"
import { dateToForm } from "../../../lib/date"
import { IklanType } from "../../../typings/component"
import style from "./style.module.css"

export const EditIklanForm: FC<{ iklan: IklanType }> = ({ iklan }) => {
  const [data, setData] = useState(iklan)
  const handleOnChange = (key: keyof Omit<IklanType, "_id">, input: string | Date) => {
    setData({
      ...data,
      [key]: input,
    })
  }

  const update = async () => {
    const response = await fetch("/api/iklan/edit", {
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
        <span>Nama Iklan</span>
        <input
          type="text"
          placeholder="Iklan Hari raya"
          value={data.nama_iklan}
          onChange={(e) => handleOnChange("nama_iklan", e.target.value)}
        />
        <span>Gambar</span>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={data.gambar}
          onChange={(e) => handleOnChange("gambar", e.target.value)}
        />
        <span>Expired</span>
        <input
          type="date"
          value={dateToForm(data.expired)}
          onChange={(e) => handleOnChange("expired", new Date(e.target.value))}
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
