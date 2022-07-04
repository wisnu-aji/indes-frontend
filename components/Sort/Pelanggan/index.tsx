import { FC, useEffect } from "react";
import { StatusPelanggan, usePelanggan } from "../../../hooks/use-pelanggan";
import { limitPage } from "../../../lib/option";
import { IndesPelangganListAPI } from "../../../typings/component";
import style from "./style.module.css";

const statusList: StatusPelanggan[] = [null, "sudah-bayar", "telat-bayar"];

export const SortPelanggan: FC = () => {
  const {
    statusPelanggan,
    setStatusPelanggan,
    setStatus,
    query,
    setPelangganList,
    setTotalPage,
    range
  } = usePelanggan();

  useEffect(() => {
    setStatus("loading");

    // represent loading on change
    const payload = {
      page: 1,
      limit: limitPage,
      sortBy: "nama",
      status: statusPelanggan,
      query,
      ...range
    };
    fetch("/api/user/list", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((data) => data.json())
      .then((data) => {
        const { list, total } = data as IndesPelangganListAPI;
        setPelangganList(data.list);
        setTotalPage(Math.ceil(data.total / limitPage));
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPelanggan]);

  return (
    <div className={style.container}>
      <span>Status: </span>
      {statusList.map((value) => {
        return (
          <div
            key={`status-${value || "semua"}`}
            className={
              statusPelanggan === value ? style.active : style.inactive
            }
            onClick={() => setStatusPelanggan(value)}
          >
            {value ? value.split("-").join(" ") : "Semua"}
          </div>
        );
      })}
    </div>
  );
};
