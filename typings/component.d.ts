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



export interface AdminType {
  _id: number
  email: string
  name: string
}

export interface PaketType {
  _id: number
  kecepatan: string
  harga: number
}
export interface RiwayatPembayaran {
  tanggal: Date
  jumlahPembayaran: number
}

export interface PelangganType {
  _id: number
  nama: string
  alamat: string
  telepon: number
  paket: number
  pemasangan: Date
  batasPembayaran: Date
  riwayatPembayaran: RiwayatPembayaran[]
}

export type User = Omit<PelangganType, "_id">
export interface IklanType {
  _id: number
  nama_iklan: string
  expired: Date
  gambar: string
}

