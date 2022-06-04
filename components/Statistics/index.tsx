import Image from "next/image"
import Router from "next/router"
import { FC, useEffect, useState } from "react"
import { stat } from "../../lib/stat"
import style from "./style.module.css"

export const Statistics: FC = () => {
  const [sudahBayar, setSudahBayar] = useState<number>(0)
  const [telatBayar, setTelatBayar] = useState<number>(0)

  const getStat = () => {
    stat().then((data) => {
      console.log(JSON.stringify(data))
      if (data) {
        setSudahBayar(data.sudahBayar.count)
        setTelatBayar(data.telatBayar.count)
      }
    })
  }

  useEffect(() => {
    getStat()
    const interval = setInterval(() => {
      getStat()
    }, 1000 * 60)
    return () => {
      setSudahBayar(0)
      setTelatBayar(0)
      clearInterval(interval)
    }
  }, [])
  const go = () => {
    Router.push("/admin/mengelola-pelanggan")
  }
  return (
    <div className={style.container}>
      <div>
        <Image src={"/family.webp"} width={400} height={250} alt="keluarga" className={style.keluarga} />
      </div>
      <div className={style.jumlah}>
        <span className={style.underline + " " + style.blue} onClick={go}>
          {telatBayar + sudahBayar} Keluarga
        </span>{" "}
        sudah menggunakan Internet Desa Demak
      </div>
      <div className={style.bayar}>
        Dan{" "}
        <span className={style.underline + " " + style.green} onClick={go}>
          {telatBayar + sudahBayar === sudahBayar
            ? "Semuanya"
            : `${sudahBayar} diantaranya`}{" "}
        </span>
        sudah melakukan pembayaran
      </div>
    </div>
  )
}
