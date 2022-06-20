import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { AdminContext } from "../../../hooks/use-admin";
import { AdminLayout } from "../../../layout";
import { AdminType, SessionWithRole } from "../../../typings/component";
import { AdminTable } from "../../../components/Table/Admin";
import Router from "next/router";
const MengelolaAdmin: FC = () => {
  const [admin, setAdmin] = useState<AdminType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [query, setQuery] = useState("");
  const sesion = useSession();
  // const router = Router()
  const data = sesion.data as SessionWithRole | null;
  if (data && data.role !== "admin-utama") {
    Router.push("/admin");
  }

  return (
    <AdminLayout>
      <AdminContext.Provider
        value={{
          admin,
          setAdmin,
          page,
          totalPage,
          setPage,
          setTotalPage,
          query,
          setQuery,
        }}
      >
        <AdminTable />
      </AdminContext.Provider>
    </AdminLayout>
  );
};

export default MengelolaAdmin;
