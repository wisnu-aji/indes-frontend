import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { AdminLayout } from "../../../layout";
import { PaketType, SessionWithRole } from "../../../typings/component";
import Router from "next/router";
import { PaketContext } from "../../../hooks/use-paket";
import { PaketTable } from "../../../components/Table/Paket";
const MengelolaPaket: FC = () => {
  const sesion = useSession();
  const [paket, setPaket] = useState<PaketType[]>([]);
  const data = sesion.data as SessionWithRole | null;
  if (data && data.role !== "admin-utama") {
    Router.push("/admin");
  }
  return (
    <AdminLayout>
      <PaketContext.Provider value={{ paket, setPaket }}>
        <PaketTable />
      </PaketContext.Provider>
    </AdminLayout>
  );
};

export default MengelolaPaket;
