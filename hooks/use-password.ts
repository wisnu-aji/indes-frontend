import { IklanType, PaketType } from "../typings/component";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface Paket {
  paket: PaketType[];
  setPaket: Dispatch<SetStateAction<PaketType[]>>;
}
export const PaketContext = createContext<Paket>({
  paket: [],
  setPaket: () => {},
});

export const usePaket = () => useContext(PaketContext);
