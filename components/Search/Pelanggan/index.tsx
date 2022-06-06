import { FC } from "react"
import { usePelanggan } from "../../../hooks/use-pelanggan"
import style from "./style.module.css"

export const SearchPelanggan: FC = () => {
  const { setQuery, query, setStatus, setStatusPelanggan, statusPelanggan } = usePelanggan()

  return (
    <div className={style.container}>
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        placeholder='Masukan nama / id / nomor telepon'
      />
      <button>Submit</button>
    </div>
  )
}
