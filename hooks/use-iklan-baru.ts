import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IklanType } from "../typings/component";

type Iklan = Omit<IklanType, '_id'>

interface IklanBaru {
  iklanBaru: Iklan
  setIklanBaru: Dispatch<SetStateAction<Iklan>>
}

export const IklanBaruContext = createContext<IklanBaru>({
  iklanBaru: {
    nama_iklan: "",
    gambar: "",
    expired: new Date(),
  },
  setIklanBaru: () => {},
})

export const useIklanBaru = () => useContext(IklanBaruContext)


    