import { FC, useEffect } from "react";
import { toast } from "react-toastify";
import { useIklan } from "../../../hooks/use-iklan";
import { usePaket } from "../../../hooks/use-paket";
import { Modal } from "../../../layout/Modal";
import { dateToIndonesian } from "../../../lib/date";
import { limitPage } from "../../../lib/option";
import { IklanType, PaketType } from "../../../typings/component";
import { EditIklanForm } from "../../Form/EditIklan";
import { EditPaketForm } from "../../Form/EditPaket";
import style from "./style.module.css";
export const PaketTable: FC = () => {
  const { paket, setPaket } = usePaket();

  useEffect(() => {
    fetch("https://api.wisnuaji.my.id/api/v1/paket")
      .then((data) => data.json())
      .then((data) => {
        setPaket(
          data.sort((a: { _id: number }, b: { _id: number }) => a._id - b._id)
        );
      });
  }, []);
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th className={style.cell}>ID</th>
            <th className={style.cell}>Kecepatan</th>
            <th className={style.cell}>Harga</th>
            <th className={style.cell}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paket.map((paket: PaketType) => (
            <tr key={paket._id}>
              <td className={style.cell}>{paket._id}</td>
              <td className={style.cell}>{paket.kecepatan}</td>
              <td className={style.cell}>{paket.harga}</td>
              <td className={style.cell}>
                <Modal label="Edit">
                  <EditPaketForm paket={paket} />
                </Modal>
                <Modal label="Hapus">
                  <div>
                    <p>Apakah anda yakin ingin menghapus data ini?</p>
                    <button
                      onClick={() => {
                        const hapus = async () => {
                          const response = await fetch("/api/paket/delete", {
                            method: "POST",
                            body: JSON.stringify(paket),
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
