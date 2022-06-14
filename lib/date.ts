import { getBulan } from "./bulan"

export const dateToForm = (input: string | Date): string => {
  const date = new Date(input)
  return (
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    date.getFullYear()
  )
}

export const dateToIndonesian = (input: string | Date): string => {
  const date = new Date(input)
  return (
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    " " +
    getBulan(date.getMonth() + 1) +
    " " +
    date.getFullYear()
  )
}
