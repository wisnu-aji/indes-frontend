import { FC, useEffect } from "react"
import { usePelanggan } from "../../../hooks/use-pelanggan"
import style from "./style.module.css"
import { useState } from "react"
import { limitPage } from "../../../lib/option"
import { IndesPelangganListAPI } from "../../../typings/component"
export const RangePelanggan: FC = ({ children }) => {
  const {
    range,
    setRange,
    statusPelanggan,
    setStatusPelanggan,
    setStatus,
    query,
    setPelangganList,
    setTotalPage,
  } = usePelanggan()
  const [bulan, setBulan] = useState<string | null>(null)
  const [tahun, setTahun] = useState<string | null>(null)
  const tahunPembuatan = 2020
  const tahunSekarang = new Date().getFullYear()

  const daftarTahun = Array.from(
    { length: tahunSekarang - tahunPembuatan + 1 },
    (_, i) => tahunPembuatan + i
  )

  useEffect(() => {
    if (bulan && tahun) {
      setRange({
        from: new Date(`${tahun}-${bulan}-01`),
        to: new Date(+tahun, +bulan, 1, 23, 59, 59, 999),
      })
    }
  }, [bulan, tahun, setRange])
  useEffect(() => {
    setStatus("loading")
    const payload = {
      page: 1,
      limit: limitPage,
      sortBy: "nama",
      status: statusPelanggan,
      query,
      ...range,
    }
    fetch("/api/user/list", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((data) => data.json())
      .then((data) => {
        const { list, total } = data as IndesPelangganListAPI
        setPelangganList(data.list)
        setTotalPage(Math.ceil(data.total / limitPage))
        setStatus("success")
      })
      .catch(() => {
        setStatus("error")
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])
  return (
    <div className={style.range}>
      <div className={style.label}>
        <span>Bulan</span>
        <select value={bulan || ""} onChange={(e) => setBulan(e.target.value)}>
          <option value="">Semua</option>
          <option value="01">Januari</option>
          <option value="02">Februari</option>
          <option value="03">Maret</option>
          <option value="04">April</option>
          <option value="05">Mei</option>
          <option value="06">Juni</option>
          <option value="07">Juli</option>
          <option value="08">Agustus</option>
          <option value="09">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">Desember</option>
        </select>
      </div>
      <div className={style.label}>
        <span>Tahun</span>
        <select value={tahun || ""} onChange={(e) => setTahun(e.target.value)}>
          <option value="">Semua</option>
          {daftarTahun.map((_tahun, i) => {
            return (
              <option key={_tahun} value={_tahun}>
                {_tahun}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
