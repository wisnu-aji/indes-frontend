import { FormPelanggan } from "@prisma/client"
import React, { FC, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { PilihPaket } from "../../components/PilihPaket"
import { PaketType } from "../../typings/component"
import style from "./style.module.css"

type FormDataType = Omit<FormPelanggan, "id" | "batasPembayaran" | "pemasangan">

const Form: FC = () => {
  const [data, setData] = useState<FormDataType>({
    nama: "",
    alamat: "",
    telepon: "",
    paket: 1,
  })
  const [paket, setPaket] = useState<PaketType[]>([])
  useEffect(() => {
    fetch("https://api.wisnuaji.my.id/api/v1/paket")
      .then((data) => data.json())
      .then((data) => {
        setPaket(data)
      })
  }, [])

  const handleChange = (key: keyof FormDataType, value: string | number) => {
    setData({
      ...data,
      [key]: value,
    })
  }
  const save = async () => {
    const response = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const result = await response.json()
    if (result.error) throw new Error(result.error)
    return result
  }
  return (
    <div className={style.container}>
      <div>
        <p>
          <label> Nama : </label>
          <input
            type="text"
            onChange={(e) => handleChange("nama", e.target.value)}
          />
        </p>
        <p>
          <label> Alamat : </label>
          <input
            type="text"
            onChange={(e) => handleChange("alamat", e.target.value)}
          />
        </p>
        <p>
          <label> Masukkan nomer telepon : </label>
          <input
            type="number"
            onChange={(e) => handleChange("telepon", e.target.value)}
          />
        </p>

        
        <PilihPaket
          onSelected={(selected) => {
            handleChange("paket", +selected)
          }}
        />

        <button
          onClick={async () => {
            const response = await toast.promise(save, {
              success: "Selesai menyimpan",
              pending: "menyimpan data...",
              error: "gagal menyimpan data",
            })

            console.log(response)
          }}
        >
          Daftar
        </button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
export default Form
