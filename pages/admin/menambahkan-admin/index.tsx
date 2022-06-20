import { useSession } from "next-auth/react";
import Error from "next/error";
import Router from "next/router";
import { FC, useState } from "react";
import { SaveAdminBaru } from "../../../components/Button/SaveAdminBaru";
import { AdminBaruForm } from "../../../components/Form/AdminBaru";
import { AdminBaruContext } from "../../../hooks/use-admin-baru";
import { AdminLayout } from "../../../layout";
import { AdminType, SessionWithRole } from "../../../typings/component";

const MenambahkanAdmin: FC = () => {
  const [adminBaru, setAdminBaru] = useState<Omit<AdminType, "_id">>({
    name: "",
    email: "",
  });
  const sesion = useSession();
  const data = sesion.data as SessionWithRole | null;
  if (data && data.role !== "admin-utama") {
    Router.push("/admin");
  }
  return (
    <AdminLayout>
      <AdminBaruContext.Provider value={{ adminBaru, setAdminBaru }}>
        <AdminBaruForm />
        <SaveAdminBaru />
      </AdminBaruContext.Provider>
    </AdminLayout>
  );
};

export default MenambahkanAdmin;
