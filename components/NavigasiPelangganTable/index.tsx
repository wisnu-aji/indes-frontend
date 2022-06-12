import style from "./style.module.css"
import type { FC } from "react"
import { usePelanggan } from "../../hooks/use-pelanggan"
import { limitPage } from "../../lib/option"
import { IndesPelangganListAPI } from "../../typings/component"

export const NavigasiPelangganTable: FC = () => {
  const { totalPage, setPage, page, setPelangganList, statusPelanggan, setTotalPage } = usePelanggan()
  const handleSubmit = async (page: number) => {
    try {
      const payload = {
        page,
        limit: limitPage,
        sortBy: "nama",
        status: statusPelanggan,
      }

      const response = await fetch("/api/user/list", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as IndesPelangganListAPI
      setPelangganList(data.list)
      setPage(page)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className={style.container}>
      <button onClick={() => handleSubmit(page - 1)} disabled={page <= 1}>
        {"<"}
      </button>
      {page} / {totalPage}
      <button
        onClick={() => handleSubmit(page + 1)}
        disabled={page >= totalPage}
      >
        {">"}
      </button>
    </div>
  )
}
