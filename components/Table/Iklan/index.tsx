import { FC, useEffect } from "react";
import { toast } from "react-toastify";
import { useIklan } from "../../../hooks/use-iklan";
import { Modal } from "../../../layout/Modal";
import { dateToIndonesian } from "../../../lib/date";
import { limitPage } from "../../../lib/option";
import { EditIklanForm } from "../../Form/EditIklan";
import style from "./style.module.css";
export const IklanTable: FC = () => {
  const { iklan, setIklan } = useIklan();

  useEffect(() => {
    const payload = { query: "", page: 1, limit: limitPage };
    fetch("/api/iklan/list", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((data) => data.json())
      .then((data) => {
        setIklan(data.list);
      });
  }, []);
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th className={style.cell}>Nama Iklan</th>
            <th className={style.cell}>Gambar</th>
            <th className={style.cell}>Expired</th>
            <th className={style.cell}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {iklan.map((iklan) => (
            <tr key={iklan._id}>
              <td className={style.cell}>{iklan.nama_iklan}</td>
              <td className={style.cell}>{iklan.gambar}</td>
              <td className={style.cell}>{dateToIndonesian(iklan.expired)}</td>
              <td className={style.cell}>
                <Modal label="Edit">
                  <EditIklanForm iklan={iklan} />
                </Modal>
                <Modal label="Hapus">
                  <div>
                    <p>Apakah anda yakin ingin menghapus data ini?</p>
                    <button
                      onClick={() => {
                        const hapus = async () => {
                          const response = await fetch("/api/iklan/delete", {
                            method: "POST",
                            body: JSON.stringify(iklan),
                          });
                          const data = await response.json();
                          if (data.error) throw new Error(data.error);
                          return data;
                        };

                        toast.promise(hapus, {
                          success: "Data berhasil dihapus",
                          error: "Data gagal dihapus",
                          pending: "Menghapus data",
                        });
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
  );
};
