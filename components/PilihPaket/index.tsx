import { FC, useEffect, useState } from "react"
import { PaketType } from "../../typings/component"
import style from "./style.module.css"

export const PilihPaket: FC<{
  onSelected: (selected: string) => void
  defaultValue?: string
}> = ({ onSelected, defaultValue }) => {
  // make options for select with useState
  const [options, setOptions] = useState<PaketType[]>([])
  // make selected option with useState
  const [_selected, _setSelected] = useState<string>("")
  useEffect(() => {
    fetch("https://api.wisnuaji.my.id/api/v1/paket")
      .then((data) => data.json())
      .then((data) => {
        setOptions(
          data.sort((a: { _id: number }, b: { _id: number }) => a._id - b._id)
        )
        if (!!defaultValue) {
          _setSelected(defaultValue)
        }
      })
  }, [])
  return (
    <div className={style.container}>
      <select
        value={_selected}
        onChange={(e) => {
          _setSelected(e.target.value)
          onSelected(e.target.value)
        }}
      >
        {options.map((option) => (
          <option key={"paket" + option._id} value={option._id}>
            Paket {option._id} / {option.kecepatan} / {option.harga}
          </option>
        ))}
      </select>
    </div>
  )
}
