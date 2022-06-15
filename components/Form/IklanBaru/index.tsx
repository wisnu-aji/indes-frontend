import { FC } from "react"
import { useIklanBaru } from "../../../hooks/use-iklan-baru"
import { dateToForm } from "../../../lib/date"
import {  IklanType } from "../../../typings/component"
import style from "./style.module.css"

export const IklanBaruForm: FC = () => {
  const { iklanBaru, setIklanBaru } = useIklanBaru()

  const handleOnChange = (key: keyof Omit<IklanType, "_id">, input: string | Date) => {
    setIklanBaru({
      ...iklanBaru,
      [key]: input,
    })
  }
  return (
    <div className={style.form}>
      <span>Nama Iklan</span>
      <input
        type="text"
        placeholder="Iklan Hari raya"
        onChange={(e) => handleOnChange("nama_iklan", e.target.value)}
      />
      <span>URL Gambar</span>
      <input
        type="text"
        placeholder="https://example.com/image.jpg"
        onChange={(e) => handleOnChange("gambar", e.target.value)}
      />
      <span>Expired</span>
      <input
          type="date"
          lang="id-ID"
          id="pemasangan"
          value={dateToForm(iklanBaru.expired)}
          onChange={(e) => {
            console.log(e.target.value)
            handleOnChange(
              "expired",
              new Date(e.target.value),
            )
          }}
        />
    </div>
  )
}
