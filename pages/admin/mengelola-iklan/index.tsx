import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { AdminLayout } from "../../../layout";
import { IklanType, SessionWithRole } from "../../../typings/component";
import Error from "next/error";
import Router from "next/router";
import { IklanContext } from "../../../hooks/use-iklan";
import { IklanTable } from "../../../components/Table/Iklan";
const MengelolaIklan: FC = () => {
  const sesion = useSession();
  const data = sesion.data as SessionWithRole | null;

  const [iklan, setIklan] = useState<IklanType[]>([]);
  if (data && data.role !== "admin-utama") {
    Router.push("/admin");
  }
  return (
    <AdminLayout>
      <IklanContext.Provider value={{ iklan, setIklan }}>
        <IklanTable />
      </IklanContext.Provider>
    </AdminLayout>
  );
};

export default MengelolaIklan;
