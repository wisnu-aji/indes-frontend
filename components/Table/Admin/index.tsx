import { FC, useEffect } from "react"
import { useAdmin } from "../../../hooks/use-admin"
import { limitPage } from "../../../lib/option"
import style from "./style.module.css"
export const AdminTable: FC = () => {
  const { admin, setAdmin, query, page, setTotalPage } = useAdmin()

  useEffect(() => {
    const payload = { query, page, limit: limitPage }
    fetch("/api/admin/list", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((data) => data.json())
      .then((data) => {
        setAdmin(data.list)
        setTotalPage(Math.ceil(data.total / limitPage))
      })
  }, [])
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th className={style.cell}>Nama</th>
            <th className={style.cell}>Email</th>
            <th className={style.cell}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((item) => (
            <tr key={item._id}>
              <td className={style.cell}>{item.name}</td>
              <td className={style.cell}>{item.email}</td>
              <td className={style.cell}>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
