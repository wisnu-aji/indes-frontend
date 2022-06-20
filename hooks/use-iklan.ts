import { IklanType } from "../typings/component";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface Iklan {
  iklan: IklanType[];
  setIklan: Dispatch<SetStateAction<IklanType[]>>;
}
export const IklanContext = createContext<Iklan>({
  iklan: [],
  setIklan: () => {},
});

export const useIklan = () => useContext(IklanContext);
