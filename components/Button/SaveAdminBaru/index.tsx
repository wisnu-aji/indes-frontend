import { FC } from "react";
import { toast } from "react-toastify";
import { useAdminBaru } from "../../../hooks/use-admin-baru";
import style from "./style.module.css";

export const SaveAdminBaru: FC = () => {
  const { adminBaru } = useAdminBaru();
  const save = async () => {
    if (!adminBaru.email || !adminBaru.name) throw new Error();
    const response = await fetch("/api/admin/add", {
      method: "POST",
      body: JSON.stringify(adminBaru),
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
