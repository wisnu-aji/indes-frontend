import { FC, useEffect } from "react"
import { StatusPelanggan, usePelanggan } from "../../../hooks/use-pelanggan"
import style from "./style.module.css"

const statusList: StatusPelanggan[] = [null, "sudah-bayar", "telat-bayar"]

export const SortPelanggan: FC = () => {
  const { statusPelanggan, setStatusPelanggan, setStatus } = usePelanggan()

  useEffect(() => {
    setStatus("loading")

    // represent loading on change
    setTimeout(() => {
      setStatus("success")
    }, 3000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPelanggan])

  return (
    <div className={style.container}>
      <span>Status: </span>
      {statusList.map((value) => {
        return (
          <div
            key={`status-${value || "semua"}`}
            className={
              statusPelanggan === value ? style.active : style.inactive
            }
            onClick={() => setStatusPelanggan(value)}
          >
            {value
              ? value
                  .split("-")
                  .join(" ")
              : "Semua"}
          </div>
        )
      })}
    </div>
  )
}
