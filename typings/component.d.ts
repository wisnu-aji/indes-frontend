import type { Session } from "next-auth"

export interface SessionWithRole extends Session {
  role: "admin" | "admin-utama"
}

export type Role = "admin" | "admin-utama" | null