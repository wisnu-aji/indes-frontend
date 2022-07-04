import { createContext, Dispatch, SetStateAction, useContext } from "react"
import { Pelanggan } from "../typings/component"

export type Status = "loading" | "success" | "error" | "idle"
export type StatusPelanggan = null | "sudah-bayar" | "telat-bayar"

export interface PelangganBaruContext {
  pelangganList: Pelanggan[]
  setPelangganList: Dispatch<SetStateAction<Pelanggan[]>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  totalPage: number
  setTotalPage: Dispatch<SetStateAction<number>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  status: Status
  setStatus: Dispatch<SetStateAction<Status>>
  statusPelanggan: StatusPelanggan
  setStatusPelanggan: Dispatch<SetStateAction<StatusPelanggan>>
  range: { from: Date | null; to: Date | null }
  setRange: Dispatch<SetStateAction<{ from: Date | null; to: Date | null }>>
}
export const PelangganContext = createContext<PelangganBaruContext>({
  pelangganList: [],
  setPelangganList: () => {},
  page: 1,
  setPage: () => {},
  totalPage: 1,
  setTotalPage: () => {},
  query: "",
  setQuery: () => {},
  status: "idle",
  setStatus: () => {},
  statusPelanggan: null,
  setStatusPelanggan: () => {},
  range: { from: null, to: null },
  setRange: () => {},
})

export const usePelanggan = () => useContext(PelangganContext)
