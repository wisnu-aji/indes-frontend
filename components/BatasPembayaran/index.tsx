import { FC } from "react";
import { getBulan } from "../../lib/bulan";
import style from "./style.module.css";
export const BatasPembayaran: FC<{ isLate: boolean; tanggal: Date }> = ({
  children,
  isLate,
  tanggal,
}) => {
  const tgl = new Date(tanggal);
  const bulan = tgl.getMonth();
  const hari = tgl.getDate();
  const tahun = tgl.getFullYear();
  return (
    <div className={style.container + " " + (isLate ? style.late : "")}>
      {hari} {getBulan(bulan + 1)} {tahun}
    </div>
  );
};
