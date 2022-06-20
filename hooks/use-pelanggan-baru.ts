import { createContext, useContext } from "react";
export interface PelangganBaruContext {
  pelanggan: {
    nama: string;
    alamat: string;
    telepon: string;
    paket: string;
    pemasangan: string;
  };
  setPelanggan: (pelanggan: {
    nama: string;
    alamat: string;
    telepon: string;
    paket: string;
    pemasangan: string;
  }) => void;
}
export const PelangganContext = createContext<PelangganBaruContext>({
  pelanggan: {
    nama: "",
    alamat: "",
    telepon: "",
    paket: "",
    pemasangan: "",
  },
  setPelanggan: () => {},
});

export const usePelangganBaru = () => useContext(PelangganContext);
