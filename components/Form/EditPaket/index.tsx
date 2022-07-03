import { FC, useState } from "react";
import { toast } from "react-toastify";
import { dateToForm } from "../../../lib/date";
import { IklanType, PaketType } from "../../../typings/component";
import style from "./style.module.css";

export const EditPaketForm: FC<{ paket: PaketType }> = ({ paket }) => {
  const [data, setData] = useState(paket);
  const handleOnChange = (
    key: keyof Omit<PaketType, "_id">,
    input: string | Date | number
  ) => {
    setData({
      ...data,
      [key]: input,
    });
  };

  const update = async () => {
    const response = await fetch("/api/paket/edit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.error) throw new Error(res.error);
    return res;
  };
  return (
    <div className={style.container}>
      <div className={style.form}>
        <span>Kecepatan</span>
        <input
          type="text"
          placeholder="100 Mbps"
          value={data.kecepatan}
          onChange={(e) => handleOnChange("kecepatan", e.target.value)}
        />
        <span>Harga</span>
        <input
          type="number"
          placeholder="100000"
          value={data.harga}
          onChange={(e) => handleOnChange("harga", new Date(e.target.value))}
        />
      </div>
      <div className={style.save}>
        <button
          className={style.btn}
          onClick={() => {
            toast.promise(update, {
              success: "Data berhasil diubah",
              error: "Data gagal diubah",
              pending: "Memperbarui data",
            });
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};
