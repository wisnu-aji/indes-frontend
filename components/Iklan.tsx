import React, { FC, useEffect, useState } from "react";
import { Data } from "../pages/api/iklan";
import style from "../styles/Home.module.css";

export const Iklan: FC = () => {
  const [data, setData] = useState<Array<Data>>([]);

  useEffect(() => {
    fetch("/api/iklan")
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  }, []);

  return (
    <div className={style.iklan}>
      {data.map((iklan) => {
        const hariIni = new Date();
        const expired = new Date(iklan.expired);
        if (hariIni.getTime() > expired.getTime()) return null;
        return <img className={style.gambar} src={iklan.gambar} />;
      })}
    </div>
  );
};
