import { FC } from "react";
import { toast } from "react-toastify";
import { usePaketBaru } from "../../../hooks/use-paket-baru";
import style from "./style.module.css";

export const SavePaketBaru: FC = () => {
  const { paketBaru } = usePaketBaru();
  const save = async () => {
    const response = await fetch("/api/paket/add", {
      method: "POST",
      body: JSON.stringify(paketBaru),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
  };
  return (
    <div className={style.container}>
      <button
        className={style.btn}
        onClick={async () => {
          const response = await toast.promise(save, {
            success: "Selesai menyimpan",
            pending: "menyimpan data...",
            error: "gagal menyimpan data",
          });

          console.log(response);
        }}
      >
        Save
      </button>
    </div>
  );
};
