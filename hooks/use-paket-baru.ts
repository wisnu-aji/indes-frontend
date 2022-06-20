import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { PaketType } from "../typings/component";

interface PaketBaru {
  paketBaru: PaketType;
  setPaketBaru: Dispatch<SetStateAction<PaketType>>;
}

export const PaketBaruContext = createContext<PaketBaru>({
  paketBaru: {
    _id: 0,
    kecepatan: "",
    harga: 0,
  },
  setPaketBaru: () => {},
});

export const usePaketBaru = () => useContext(PaketBaruContext);
