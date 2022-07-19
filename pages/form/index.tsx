import { FormPelanggan } from "@prisma/client"
import React, { FC, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { PilihPaket } from "../../components/PilihPaket"
import { hash } from "../../lib/hash"
import { PaketType } from "../../typings/component"
import style from "./style.module.css"

type FormDataType = Omit<FormPelanggan, "id" | "batasPembayaran" | "pemasangan">

const Form: FC = () => {
  const [data, setData] = useState<FormDataType>({
    nama: "",
    alamat: "",
    telepon: "",
    password: "",
    paket: 1,
  })
  const [lihatPassword, setLihatPassword] = useState<"text" | "password">(
    "password"
  )
  const [password, setPassword] = useState<string>("")

  const handleChange = (key: keyof FormDataType, value: string | number) => {
    if (key === "password") {
      setPassword(value as string)
      setData({ ...data, password: hash(value as string) })
      return
    }
    setData({
      ...data,
      [key]: value,
    })
  }
  const save = async () => {
    if (!data.nama || !data.alamat || !data.telepon || !data.password) {
      throw new Error("Data tidak lengkap")
    }
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
        <p>
          <label> Masukkan password : </label>
          <input
            type={lihatPassword}
            onChange={(e) => handleChange("password", hash(e.target.value))}
          />
          <span
            onClick={() =>
              setLihatPassword((text) =>
                text === "text" ? "password" : "text"
              )
            }
            style={{ cursor: "pointer" }}
          >
            Lihat
          </span>
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
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}
export default Form
