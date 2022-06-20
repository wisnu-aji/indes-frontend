import { AdminType } from "../typings/component";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface Admin {
  admin: AdminType[];
  page: number;
  totalPage: number;
  query: string;
  setAdmin: Dispatch<SetStateAction<AdminType[]>>;
  setPage: Dispatch<SetStateAction<number>>;
  setTotalPage: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<string>>;
}
export const AdminContext = createContext<Admin>({
  admin: [],
  page: 1,
  totalPage: 1,
  query: "",
  setAdmin: () => {},
  setPage: () => {},
  setTotalPage: () => {},
  setQuery: () => {},
});

export const useAdmin = () => useContext(AdminContext);
