import { FC, useState } from "react";
import { SavePelangganBaru } from "../../../components/Button/SavePelangganBaru";
import { PelangganBaru } from "../../../components/Form/PelangganBaru";
import { Title } from "../../../components/Title";
import { PelangganContext } from "../../../hooks/use-pelanggan-baru";
import { AdminLayout } from "../../../layout";
import { getToday } from "../../../lib/getToday";

const MenambahkanPelanggan: FC = () => {
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    alamat: "",
    telepon: "",
    paket: "",
    paswort: "" getToday(),
    pemasangan:,
  });
  return (
    <AdminLayout>
      <PelangganContext.Provider value={{ pelanggan, setPelanggan }}>
        <Title>Menambahkan Pelanggan</Title>
        <PelangganBaru />
        <SavePelangganBaru />
      </PelangganContext.Provider>
    </AdminLayout>
  );
};

export default MenambahkanPelanggan;
