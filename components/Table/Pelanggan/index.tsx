import { FC, useEffect } from "react";
import { usePelanggan } from "../../../hooks/use-pelanggan";
import { Modal } from "../../../layout/Modal";
import { dateToIndonesian } from "../../../lib/date";
import { limitPage } from "../../../lib/option";
import { IndesPelangganListAPI, Pelanggan } from "../../../typings/component";
import { BatasPembayaran } from "../../BatasPembayaran";
import { EditPelanggan } from "../../Form/EditPelanggan";
import { HapusPelanggan } from "../../HapusPelanggan";
import style from "./style.module.css";

export const TablePelanggan: FC = () => {
  const {
    pelangganList,
    status,
    statusPelanggan,
    query,
    page,
    setPage,
    totalPage,
    setPelangganList,
    setTotalPage,
    setStatusPelanggan,
    setQuery,
  } = usePelanggan();
  const handleSubmit = async () => {
    try {
      const payload = {
        page,
        limit: limitPage,
        sortBy: "nama",
        status: statusPelanggan,
      };

      const response = await fetch("/api/user/list", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as IndesPelangganListAPI;
      setPelangganList(data.list);
      setTotalPage(Math.ceil(data.total / limitPage));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSubmit();

    return () => {
      setPelangganList([]);
      setQuery("");
      setStatusPelanggan(null);
      setPage(1);
    };
  }, []);

  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr className={style.head}>
            <th className={style.cell}>id</th>
            <th className={style.cell}>Nama</th>
            <th className={style.cell}>Alamat</th>
            <th className={style.cell}>Telepon</th>
            <th className={style.cell}>Pemasangan</th>
            <th className={style.cell}>Batas Pembayaran</th>
            <th className={style.cell}>Riwayat</th>
            <th className={style.cell}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {pelangganList.length &&
            pelangganList.map((pelanggan) => {
              return (
                <tr
                  key={`pelanggan-${pelanggan._id}`}
                  className={style.pelanggan}
                >
                  <td className={style.cell}>{pelanggan._id}</td>
                  <td className={style.cell}>{pelanggan.nama}</td>
                  <td className={style.cell}>{pelanggan.alamat}</td>
                  <td className={style.cell}>{pelanggan.telepon}</td>
                  <td className={style.cell + " " + style.center}>
                    {dateToIndonesian(pelanggan.pemasangan)}
                  </td>
                  <td className={style.cell + " " + style.center}>
                    <BatasPembayaran
                      isLate={
                        new Date(pelanggan.batasPembayaran).getTime() <
                        Date.now()
                      }
                      tanggal={pelanggan.batasPembayaran}
                    />
                  </td>
                  <td className={style.cell + " " + style.center}>
                    <Modal
                      label={`History (${pelanggan.riwayatPembayaran.length})`}
                    >
                      <table>
                        <thead>
                          <tr className={style.head}>
                            <th className={style.cell}>No.</th>
                            <th className={style.cell}>Tgl</th>
                            <th className={style.cell}>Jumlah</th>
                            <th className={style.cell}>Metode Pembayaran</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pelanggan.riwayatPembayaran.map((riwayat, i) => {
                            return (
                              <tr
                                key={`riwayat-${pelanggan._id}-${i}`}
                                className={style.pelanggan}
                              >
                                <td className={style.cell}>{i + 1}</td>
                                <td className={style.cell}>
                                  {dateToIndonesian(riwayat.tanggalPembayaran)}
                                </td>
                                <td className={style.cell}>
                                  {riwayat.jumlahPembayaran}
                                </td>
                                <td className={style.cell}>
                                  {riwayat.metodePembayaran}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </Modal>
                  </td>
                  <td className={style.cell + " " + style.center}>
                    <Modal label="edit">
                      <EditPelanggan pelanggan={pelanggan} />
                    </Modal>
                    <Modal label="hapus">
                      <HapusPelanggan pelanggan={pelanggan} />
                    </Modal>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {pelangganList.length === 0 && (
        <div className={style.nodata}>tidak ada data</div>
      )}
    </div>
  );
};
