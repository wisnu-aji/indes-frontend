import { FC } from "react"
import { usePelanggan } from "../../../hooks/use-pelanggan"
import { limitPage } from "../../../lib/option"
import { IndesPelangganListAPI } from "../../../typings/component"
import style from "./style.module.css"

export const SearchPelanggan: FC = () => {
  const {
    setQuery,
    query,
    statusPelanggan,
    setPelangganList,
    setTotalPage,
    setPage,
  } = usePelanggan()

  const handleSubmit = async () => {
    try {
      setPage(1)
      const payload = {
        page: 1,
        limit: limitPage,
        sortBy: "nama",
        status: statusPelanggan,
        query,
      }

      const response = await fetch("/api/user/list", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as IndesPelangganListAPI
      setPelangganList(data.list)
      setTotalPage(Math.ceil(data.total / limitPage))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className={style.container}>
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        placeholder="Masukan nama / id / nomor telepon"
      />
      <button onClick={handleSubmit}>Cari</button>
    </div>
  )
}
