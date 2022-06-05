import { rejects } from "assert"
import { toast } from "react-toastify"
import { usePelangganBaru } from "../../../hooks/use-pelanggan-baru"
import style from "./style.module.css"

function getFormData(object: any) {
  const formData = new FormData()
  Object.keys(object).forEach((key) => formData.append(key, object[key]))
  return formData
}

export const SavePelangganBaru = () => {
  const { pelanggan, setPelanggan } = usePelangganBaru()

  return (
    <div className={style.container}>
      <button
        className={style.btn + " " + style.clear}
        onClick={() => {
          setPelanggan({
            nama: "",
            alamat: "",
            telepon: "",
            paket: "",
            pemasangan: "",
          })
        }}
      >
        Clear
      </button>
      <button
        className={style.btn + " " + style.save}
        onClick={async () => {
          const body = {
            ...pelanggan,
            pemasangan: new Date(pelanggan.pemasangan),
            paket: +pelanggan.paket
          }

          const save = new Promise(async (resolve, reject) => {
            try {
              const response = await fetch("/api/user/add", {
                method: "POST",
                body: JSON.stringify(body),
                
              })
              const data = await response.json()
              console.log(data)
              if (data.error) reject(data.error)
              resolve(data)
            } catch (error) {
              reject(error)
            }
          })

          const response = await toast.promise(save, {
            success: "Selesai menyimpan",
            pending: "menyimpan data...",
            error: "gagal menyimpan data",
          })

          console.log(response)
        }}
      >
        Save
      </button>
    </div>
  )
}
