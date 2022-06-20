import { FC } from "react";
import { usePaketBaru } from "../../../hooks/use-paket-baru";
import { dateToForm } from "../../../lib/date";
import { PaketType } from "../../../typings/component";
import style from "./style.module.css";

export const PaketBaruForm: FC = () => {
  const { paketBaru, setPaketBaru } = usePaketBaru();

  const handleOnChange = (key: keyof PaketType, input: string) => {
    setPaketBaru({
      ...paketBaru,
      [key]: input,
    });
  };
  return (
    <div className={style.form}>
      <span>ID</span>
      <input
        type="number"
        placeholder="ID Paket"
        onChange={(e) => handleOnChange("_id", e.target.value)}
      />
      <span>Kecepatan</span>
      <input
        type="text"
        placeholder="100 mbps"
        onChange={(e) => handleOnChange("kecepatan", e.target.value)}
      />
      <span>Harga</span>
      <input
        type="text"
        placeholder="10000"
        onChange={(e) => handleOnChange("harga", e.target.value)}
      />
    </div>
  );
};
