import { AdminType } from "../typings/component";
import { createContext, Dispatch, SetStateAction, useContext } from "react"

type Admin = Omit<AdminType, "_id">
export interface AdminBaru {
  adminBaru: Admin
  setAdminBaru: Dispatch<SetStateAction<Admin>>
}
export const AdminBaruContext = createContext<AdminBaru>({
  adminBaru: {
    name: "",
    email: "",
  },
  setAdminBaru: () => {},
})

export const useAdminBaru = () => useContext(AdminBaruContext)