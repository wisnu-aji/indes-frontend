import { FC, useState } from "react"
import { Status, StatusPelanggan } from "../../hooks/use-pelanggan"
import type { Pelanggan } from "../../typings/component"
import { PelangganContext } from "../../hooks/use-pelanggan"

export const PelangganLayout: FC = ({ children }) => {
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [statusPelanggan, setStatusPelanggan] = useState<StatusPelanggan>(null)
  return (
    <PelangganContext.Provider
      value={{
        pelangganList,
        setPelangganList,
        page,
        setPage,
        totalPage,
        setTotalPage,
        query,
        setQuery,
        status,
        setStatus,
        statusPelanggan,
        setStatusPelanggan,
      }}
    ><div id="pelanggan" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>

      {children}
    </div>
    </PelangganContext.Provider>
  )
}
