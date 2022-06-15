import { FC, useEffect } from "react"
import { toast } from "react-toastify"
import { useAdmin } from "../../../hooks/use-admin"
import { Modal } from "../../../layout/Modal"
import { limitPage } from "../../../lib/option"
import { EditAdminForm } from "../../Form/EditAdmin"
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
          {admin.map((admin) => (
            <tr key={admin._id}>
              <td className={style.cell}>{admin.name}</td>
              <td className={style.cell}>{admin.email}</td>
              <td className={style.cell}>
                <Modal label="Edit">
                  <EditAdminForm admin={admin} />
                </Modal>
                <Modal label="Hapus">
                  <div>
                    <p>Apakah anda yakin ingin menghapus data ini?</p>
                    <button
                      onClick={() => {
                        const hapus = async () => {
                          const response = await fetch("/api/admin/delete", {
                            method: "POST",
                            body: JSON.stringify(admin),
                          })
                          const data = await response.json()
                          if (data.error) throw new Error(data.error)
                          return data
                        }

                        toast.promise(hapus, {
                          success: "Data berhasil dihapus",
                          error: "Data gagal dihapus",
                          pending: "Menghapus data",
                        })
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
