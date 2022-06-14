export const getToday = (time?: string | Date) => {
  const today = time ? new Date(time) : new Date()
  let [date, month, year] = today
    .toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
    .split(" ")[0]
    .split("/")
  if (month.length === 1) month = "0" + month
  if (date.length === 1) date = "0" + date
  return `${year}-${month}-${date}`
}
