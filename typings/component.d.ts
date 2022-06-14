import type { Session } from "next-auth"

export interface SessionWithRole extends Session {
  role: "admin" | "admin-utama"
}

export type Role = "admin" | "admin-utama" | null


export interface RiwayatPembayaran {
  metodePembayaran: string
  tanggalPembayaran: string
  jumlahPembayaran: number
}
export interface Pelanggan {
  _id: string
  telepon: string
  nama: string
  alamat: string
  paket: number
  pemasangan: Date
  batasPembayaran: Date
  riwayatPembayaran: RiwayatPembayaran[]
}
export interface IndesPelangganListAPI {
  list: Pelanggan[]
  total: number
}