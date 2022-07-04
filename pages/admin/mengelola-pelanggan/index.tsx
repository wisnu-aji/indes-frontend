import { FC } from "react";
import { AdminLayout } from "../../../layout";
import { SearchPelanggan } from "../../../components/Search/Pelanggan";
import { TablePelanggan } from "../../../components/Table/Pelanggan";
import { PelangganLayout } from "../../../layout/PelangganLayout";
import { SortPelanggan } from "../../../components/Sort/Pelanggan";
import { NavigasiPelangganTable } from "../../../components/NavigasiPelangganTable";
import { RangePelanggan } from "../../../components/Sort/RangePelanggan";

const MengelolaPelanggan: FC = () => {
  return (
    <AdminLayout>
      <PelangganLayout>
        <SearchPelanggan />
        <SortPelanggan />
        <RangePelanggan />
        <TablePelanggan />
        <NavigasiPelangganTable />
      </PelangganLayout>
    </AdminLayout>
  );
};

export default MengelolaPelanggan;
