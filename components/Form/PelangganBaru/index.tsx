import { FormPelanggan } from "@prisma/client"
import { FC, useEffect } from "react"
import { usePelangganBaru } from "../../../hooks/use-pelanggan-baru"
import { getToday } from "../../../lib/getToday"
import { PilihPaket } from "../../PilihPaket"
import style from "./style.module.css"

export const PelangganBaru: FC<{ pelanggan?: FormPelanggan }> = (props) => {
  const { pelanggan, setPelanggan } = usePelangganBaru()
  useEffect(() => {
    if (props.pelanggan) {
      setPelanggan({
        ...props.pelanggan,
        pemasangan: getToday(),
        paket: props.pelanggan.paket.toString(),
      })
    }
  }, [props.pelanggan])
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
        <label id="nama">Password</label>
        <input
          type="password"
          id="nama"
          placeholder="password"
          value={pelanggan.password}
          onChange={(e) => {
            setPelanggan({
              ...pelanggan,
              password: e.target.value,
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
          onSelected={(selected) => {
            setPelanggan({
              ...pelanggan,
              paket: selected,
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
    </div>
  )
}
