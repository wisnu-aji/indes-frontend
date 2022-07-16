import { FormPelanggan } from "@prisma/client"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
  PelangganBaruContext,
  usePelangganBaru,
} from "../../../hooks/use-pelanggan-baru"
import { getToday } from "../../../lib/getToday"
import { PelangganType } from "../../../typings/component"
import { PilihPaket } from "../../PilihPaket"
import style from "./style.module.css"

export const PelangganBaruForm: FC<{ pelanggan: FormPelanggan }> = (props) => {
  const [pelanggan, setPelanggan] = useState<
    FormPelanggan & { pemasangan: string }
  >({ ...props.pelanggan, pemasangan: getToday() })
  const Router = useRouter()
  return (
    <div className={style.container}>
      <div className={style.form}>
        <label id="nama">Nama</label>
        <input
          type="text"
          id="nama"
          placeholder="Budi"
          value={pelanggan.nama}
          onChange={(e) => {
            setPelanggan({
              ...pelanggan,
              nama: e.target.value,
            })
          }}
        />
      </div>
      <div className={style.form}>
        <label id="alamat">alamat</label>
        <input
          type="text"
          id="alamat"
          placeholder="Jl. Pelan2, Kec. Banyak Anak Kecil"
          value={pelanggan.alamat}
          onChange={(e) => {
            setPelanggan({
              ...pelanggan,
              alamat: e.target.value,
            })
          }}
        />
      </div>
      <div className={style.form}>
        <label id="telepon">telepon</label>
        <input
          type="number"
          id="telepon"
          placeholder="085xxx"
          value={pelanggan.telepon}
          onChange={(e) => {
            setPelanggan({
              ...pelanggan,
              telepon: e.target.value,
            })
          }}
        />
      </div>
      <div className={style.form}>
        <label id="paket">paket</label>
        <PilihPaket
          defaultValue={pelanggan.paket.toString()}
          onSelected={(selected) => {
            setPelanggan({
              ...pelanggan,
              paket: +selected,
            })
          }}
        />
      </div>
      <div className={style.form}>
        <label id="pemasangan">pemasangan</label>
        <input
          type="date"
          lang="id-ID"
          id="pemasangan"
          value={pelanggan.pemasangan}
          onChange={(e) => {
            setPelanggan({
              ...pelanggan,
              pemasangan: e.target.value,
            })
          }}
          max={getToday()}
        />
      </div>
      <div>
        <button
          className={style.btn__submit}
          onClick={async () => {
            const body = {
              ...pelanggan,
              pemasangan: new Date(pelanggan.pemasangan),
              paket: +pelanggan.paket,
            }

            const save = new Promise(async (resolve, reject) => {
              try {
                const response = await fetch("/api/user/add", {
                  method: "POST",
                  body: JSON.stringify(body),
                })
                const data = await response.json()
                console.log(data)
                if (data.error) reject(data.error)
                resolve(data)
              } catch (error) {
                reject(error)
              }
            })

            const response = await toast.promise(save, {
              success: "Selesai menyimpan",
              pending: "menyimpan data...",
              error: "gagal menyimpan data",
            })

            console.log(response)
            fetch("/api/form", {
              method: "DELETE",
              body: JSON.stringify({ id: pelanggan.id }),
            }).then(() => {
              setTimeout(() => {
                Router.reload()
              }, 1000)
            })
          }}
        >
          Simpan
        </button>
        <button
          className={style.btn__remove}
          onClick={async () => {
            const del = () =>
              fetch("/api/form", {
                method: "DELETE",
                body: JSON.stringify({ id: pelanggan.id }),
              })
            const response = await toast.promise(del, {
              success: "Selesai menghapus",
              pending: "menghapus data...",
              error: "gagal mennghapus data",
            })

            console.log(response)
            setTimeout(() => {
              Router.reload()
            }, 3000)
          }}
        >
          Hapus
        </button>
      </div>
    </div>
  )
}
