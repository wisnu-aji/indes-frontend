import { FC, useState } from "react"
import { toast } from "react-toastify"
import { dateToForm } from "../../../lib/date"
import { getToday } from "../../../lib/getToday"
import { hash } from "../../../lib/hash"
import { Pelanggan } from "../../../typings/component"
import { PilihPaket } from "../../PilihPaket"
import style from "./style.module.css"

export const EditPelanggan: FC<{ pelanggan: Pelanggan }> = ({ pelanggan }) => {
  const [dataPelanggan, setDataPelanggan] = useState<Pelanggan>(pelanggan)
  const [ganti, setGanti] = useState(false)
  const [passwordBaru, setPasswordBaru] = useState("")
  const [lihat, setLihat] = useState(false)
  function handleChange<T>(key: keyof Pelanggan, input: T): void {
    if (key === "password" && (input as unknown as string) !== "") {
      setPasswordBaru(input as unknown as string)
      setDataPelanggan({
        ...dataPelanggan,
        password: hash(input as unknown as string),
      })
      return
    }
    setDataPelanggan({
      ...dataPelanggan,
      [key]: input,
    })
  }
  const simpan = async () => {
    const response = await fetch("/api/user/edit", {
      method: "POST",
      body: JSON.stringify(dataPelanggan),
    })

    const data = await response.json()
    if (data.ok === false && data.message) {
      throw new Error(data.message)
    }

    return data
  }
  return (
    <div className={style.container}>
      <div className={style.form}>
        <span id="nama">Nama</span>
        <input
          type="text"
          id="nama"
          placeholder="Budi"
          value={dataPelanggan.nama}
          onChange={(e) => {
            handleChange("nama", e.target.value)
          }}
        />
      </div>
      <div className={style.form}>
        <span id="alamat">alamat</span>
        <input
          type="text"
          id="alamat"
          placeholder="Jl. Pelan2, Kec. Banyak Anak Kecil"
          value={dataPelanggan.alamat}
          onChange={(e) => {
            handleChange("alamat", e.target.value)
          }}
        />
      </div>
      <div className={style.form}>
        <span id="telepon">telepon</span>
        <input
          type="number"
          id="telepon"
          placeholder="085xxx"
          value={dataPelanggan.telepon}
          onChange={(e) => {
            handleChange("telepon", e.target.value)
          }}
        />
      </div>
      <div className={style.form}>
        {ganti && (
          <>
            <span id="password">password</span>
            <input
              type={lihat ? "text" : "password"}
              id="telepon"
              placeholder="password"
              value={passwordBaru}
              onChange={(e) => {
                handleChange("password", e.target.value)
              }}
            />
          </>
        )}
        {ganti && <button onClick={() => setLihat((v) => !v   )}>Lihat</button>}
        <button onClick={() => setGanti(v => !v)}>Ganti password</button>
      </div>
      <div className={style.form}>
        <span id="paket">paket</span>
        <PilihPaket
          defaultValue={dataPelanggan.paket.toString()}
          onSelected={(selected) => {
            handleChange("paket", selected)
          }}
        />
      </div>
      <div className={style.form}>
        <span id="pemasangan">pemasangan</span>
        <input
          type="date"
          lang="id-ID"
          id="pemasangan"
          value={getToday(dataPelanggan.pemasangan)}
          onChange={(e) => {
            handleChange("pemasangan", new Date(e.target.value))
          }}
          max={getToday()}
        />
      </div>
      <div className={style.form}>
        <span id="pemasangan">batas pembayaran</span>
        <input
          type="date"
          lang="id-ID"
          id="pemasangan"
          value={getToday(dataPelanggan.batasPembayaran)}
          onChange={(e) => {
            handleChange("batasPembayaran", new Date(e.target.value))
          }}
        />
      </div>
      <div className={style.btn}>
        <button
          onClick={async () => {
            const response = await toast.promise(simpan, {
              success: "Selesai menyimpan",
              pending: "menyimpan data...",
              error: "gagal menyimpan data",
            })

            console.log(response)
          }}
          className={style.btn__simpan}
        >
          Simpan
        </button>
      </div>
    </div>
  )
}
