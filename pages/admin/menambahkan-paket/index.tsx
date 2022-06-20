import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { AdminLayout } from "../../../layout";
import { SessionWithRole } from "../../../typings/component";
import Router from "next/router";
import { PaketBaruContext } from "../../../hooks/use-paket-baru";
import { PaketBaruForm } from "../../../components/Form/PaketBaru";
import { SavePaketBaru } from "../../../components/Button/SavePaketBaru";
const MenambahkanPaket: FC = () => {
  const sesion = useSession();
  const [paketBaru, setPaketBaru] = useState({
    _id: 0,
    kecepatan: "",
    harga: 0,
  });
  const data = sesion.data as SessionWithRole | null;
  if (data && data.role !== "admin-utama") {
    Router.push("/admin");
  }
  return (
    <AdminLayout>
      <PaketBaruContext.Provider value={{ paketBaru, setPaketBaru }}>
        <PaketBaruForm />
        <SavePaketBaru />
      </PaketBaruContext.Provider>
    </AdminLayout>
  );
};

export default MenambahkanPaket;
