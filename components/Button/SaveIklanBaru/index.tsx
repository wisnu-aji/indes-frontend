import { FC } from "react"
import { toast } from "react-toastify"
import { useIklanBaru } from "../../../hooks/use-iklan-baru"
import style from "./style.module.css"

export const SaveIklanBaru: FC = () => {
  const { iklanBaru } = useIklanBaru()
  const save = async() => {
    const response = await fetch('/api/iklan/add', {
      method: 'POST',
      body: JSON.stringify(iklanBaru)
    })

    const data = await response.json()
    if(data.error) throw new Error(data.error)
    return data
  }
  return (
    <div className={style.container}>
      <button className={style.btn} onClick={async () => {
        
        const response = await toast.promise(save, {
          success: "Selesai menyimpan",
          pending: "menyimpan data...",
          error: "gagal menyimpan data",
        })

        console.log(response)
      }}>Save</button>
    </div>
  )
}
