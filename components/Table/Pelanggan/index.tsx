import { FC } from "react"
import { usePelanggan } from "../../../hooks/use-pelanggan"
import style from "./style.module.css"

export const TablePelanggan: FC = () => {
  const { pelangganList, status, statusPelanggan, query, page, totalPage } =
    usePelanggan()
  return <pre>{JSON.stringify({ pelangganList, status, statusPelanggan, query, page, totalPage } , null, 4)}</pre>
}
