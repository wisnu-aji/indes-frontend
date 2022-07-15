import { createContext, useContext } from "react";
export interface PelangganBaruContext {
  pelanggan: {
    nama: string;
    alamat: string;
    telepon: string;
    paket: string;
    pemasangan: string;
    password: string;
  };
  setPelanggan: (pelanggan: {
    nama: string;
    alamat: string;
    telepon: string;
    paket: string;
    pemasangan: string;
    password: string;
  }) => void;
}
export const PelangganContext = createContext<PelangganBaruContext>({
  pelanggan: {
    nama: "",
    alamat: "",
    telepon: "",
    paket: "",
    pemasangan: "",
    password:"",
  },
  setPelanggan: () => {},
});

export const usePelangganBaru = () => useContext(PelangganContext);
