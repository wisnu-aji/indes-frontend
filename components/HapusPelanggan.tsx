import { FC, useState } from "react";
import { toast } from "react-toastify";
import { Pelanggan } from "../typings/component";

export const HapusPelanggan: FC<{ pelanggan: Pelanggan }> = ({ pelanggan }) => {
  const [terhapus, setTerhapus] = useState(false);
  const hapus = async () => {
    const response = await fetch("/api/user/edit", {
      method: "POST",
      body: JSON.stringify(pelanggan),
    });

    const data = await response.json();
    if (data.ok === false && data.message) {
      throw new Error(data.message);
    }
    setTerhapus(true);
    return data;
  };
  return (
    <div>
      {!terhapus && (
        <>
          <div>
            Apakah anda yakin ingin menhapus pelanggan <b>{pelanggan.nama}</b>?
          </div>
          <div>
            <button
              onClick={async () => {
                const response = await toast.promise(hapus, {
                  success: "Selesai menghapus",
                  pending: "menghapus data...",
                  error: "gagal menghapus data",
                });

                console.log(response);
              }}
            >
              Ya
            </button>
          </div>
        </>
      )}
      {terhapus && <div>Berhasil menghapus, anda bisa menutup halaman ini</div>}
    </div>
  );
};
